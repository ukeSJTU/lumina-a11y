import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { chromium } from "playwright";
import { createGeminiMock } from "./mock/gemini-mock.mjs";
import { collectIssues, waitForIssuesCleared } from "./helpers/a11y.mjs";
import { applyActions, runAssertions } from "./helpers/scenario.mjs";
import { setupStaticRoutes, startStaticServer } from "./helpers/server.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

const defaultConfigPath = path.join(__dirname, "scenarios.json");
const args = process.argv.slice(2);
const options = {
  configPath: defaultConfigPath,
  port: 5500,
  headless: process.env.HEADLESS === "1",
  artifactsDir: path.join(repoRoot, "artifacts", "e2e"),
  onlyExamples: null,
  verbose: process.env.E2E_VERBOSE === "1",
  captureIntervalMs: Number(process.env.E2E_CAPTURE_INTERVAL_MS || "1500")
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--config" && args[i + 1]) {
    options.configPath = path.resolve(args[i + 1]);
    i += 1;
    continue;
  }
  if (arg === "--port" && args[i + 1]) {
    options.port = Number(args[i + 1]);
    i += 1;
    continue;
  }
  if (arg === "--examples" && args[i + 1]) {
    options.onlyExamples = new Set(args[i + 1].split(",").map((name) => name.trim()));
    i += 1;
    continue;
  }
  if (arg === "--headless") {
    options.headless = true;
    continue;
  }
  if (arg === "--headed") {
    options.headless = false;
    continue;
  }
  if (arg === "--artifacts" && args[i + 1]) {
    options.artifactsDir = path.resolve(args[i + 1]);
    i += 1;
    continue;
  }
  if (arg === "--capture-interval" && args[i + 1]) {
    options.captureIntervalMs = Number(args[i + 1]);
    i += 1;
    continue;
  }
  if (arg === "--verbose") {
    options.verbose = true;
    continue;
  }
}

function loadScenarios(configPath) {
  const raw = fs.readFileSync(configPath, "utf8");
  return JSON.parse(raw);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, payload) {
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
}

const LOG_LEVELS = {
  info: { label: "INFO", color: (value) => chalk.cyan(value) },
  warn: { label: "WARN", color: (value) => chalk.yellow(value) },
  error: { label: "ERROR", color: (value) => chalk.red(value) }
};

function normalizeSeverity(severity) {
  if (!severity) {
    return "info";
  }
  const normalized = String(severity).toLowerCase();
  if (normalized === "warning") {
    return "warn";
  }
  if (normalized === "info" || normalized === "warn" || normalized === "error") {
    return normalized;
  }
  return "info";
}

function formatLogLine({ level, scope, message, colorize }) {
  const entry = LOG_LEVELS[level] || LOG_LEVELS.info;
  const scopeLabel = `[${String(scope || "e2e").toUpperCase()}]`;
  const scopeText = colorize ? chalk.magenta(scopeLabel) : scopeLabel;
  const levelText = colorize ? entry.color(entry.label) : entry.label;
  return `${scopeText} ${levelText} ${message}`;
}

function createLogger(logFile, defaultScope = "e2e") {
  const useColor = Boolean(process.stdout.isTTY || process.stderr.isTTY);
  const write = (level, scope, args) => {
    const message = args.map(String).join(" ");
    const consoleLine = formatLogLine({ level, scope, message, colorize: useColor });
    if (level === "warn") {
      console.warn(consoleLine);
    } else if (level === "error") {
      console.error(consoleLine);
    } else {
      console.log(consoleLine);
    }
    if (logFile) {
      const fileLine = formatLogLine({ level, scope, message, colorize: false });
      fs.appendFileSync(logFile, `${fileLine}\n`);
    }
  };
  const scoped = (scope) => ({
    info: (...args) => write("info", scope, args),
    warn: (...args) => write("warn", scope, args),
    error: (...args) => write("error", scope, args)
  });
  return {
    ...scoped(defaultScope),
    scope: (scope) => scoped(scope)
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getServiceWorker(context) {
  const existing = context.serviceWorkers();
  if (existing.length > 0) {
    return existing[0];
  }
  return context.waitForEvent("serviceworker", { timeout: 5000 });
}

async function setApiKey(worker, apiKey) {
  await worker.evaluate(
    (value) =>
      new Promise((resolve) => {
        chrome.storage.local.set({ apiKey: value }, () => resolve(true));
      }),
    apiKey
  );
}

async function launchContext(userDataDir, log, verbose) {
  const pwLog = log.scope("pw");
  const baseOptions = {
    headless: options.headless,
    viewport: { width: 1280, height: 800 },
    env: {
      ...process.env,
      CHROME_DISABLE_CRASHPAD: "1"
    },
    args: [
      "--disable-crashpad",
      "--disable-crash-reporter",
      `--disable-extensions-except=${path.join(repoRoot, "extension")}`,
      `--load-extension=${path.join(repoRoot, "extension")}`
    ],
    logger: verbose
      ? {
          isEnabled: () => true,
          log: (name, severity, message) => {
            const level = normalizeSeverity(severity);
            const target = pwLog[level] || pwLog.info;
            target(`${name} ${message}`);
          }
        }
      : undefined
  };

  const attempts = [];
  if (process.env.E2E_CHROME_PATH) {
    attempts.push({ ...baseOptions, executablePath: process.env.E2E_CHROME_PATH });
  }
  if (process.env.E2E_CHANNEL) {
    attempts.push({ ...baseOptions, channel: process.env.E2E_CHANNEL });
  }
  attempts.push(baseOptions);
  if (!process.env.E2E_CHANNEL) {
    attempts.push({ ...baseOptions, channel: "chrome" });
  }

  let lastError = null;
  for (const attempt of attempts) {
    try {
      const details = attempt.executablePath
        ? `executablePath=${attempt.executablePath}`
        : attempt.channel
          ? `channel=${attempt.channel}`
          : "bundled chromium";
      log.info(`Launching browser (${details})`);
      return await chromium.launchPersistentContext(userDataDir, attempt);
    } catch (error) {
      lastError = error;
      const message = error?.stack || error?.message || String(error);
      log.error("Browser launch failed:", message);
    }
  }
  throw lastError;
}

async function waitForCaptureSlot({ runnerState, captureIntervalMs, log }) {
  if (!captureIntervalMs || captureIntervalMs <= 0) {
    return;
  }
  const now = Date.now();
  const last = runnerState.lastFixAt || 0;
  const waitMs = captureIntervalMs - (now - last);
  if (waitMs > 0) {
    log.info(`Waiting ${waitMs}ms to avoid capture quota`);
    await delay(waitMs);
  }
}

async function runFixWithRetry({
  context,
  scenarioName,
  geminiMock,
  runnerState,
  captureIntervalMs,
  log
}) {
  const maxAttempts = 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    await waitForCaptureSlot({ runnerState, captureIntervalMs, log });
    try {
      geminiMock.setCurrentExample(scenarioName);
      const worker = await getServiceWorker(context);
      await worker.evaluate(() => handleFixRequest());
      runnerState.lastFixAt = Date.now();
      return;
    } catch (error) {
      const message = error?.message || String(error);
      if (!message.includes("MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND")) {
        throw error;
      }
      attempt += 1;
      if (attempt >= maxAttempts) {
        throw error;
      }
      const backoff = captureIntervalMs * attempt;
      log.warn(`Capture quota hit; retrying in ${backoff}ms`);
      await delay(backoff);
    }
  }
}

async function runScenario({
  scenario,
  page,
  context,
  geminiMock,
  baseUrl,
  outputDir,
  runnerState,
  captureIntervalMs,
  log
}) {
  const result = {
    name: scenario.name,
    path: scenario.path,
    status: "passed",
    assertions: [],
    issues: {
      before: 0,
      after: 0
    },
    error: null
  };

  const scenarioDir = path.join(outputDir, scenario.name);
  ensureDir(scenarioDir);

  try {
    const targetUrl = new URL(scenario.path, baseUrl).toString();
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    await applyActions(page, scenario.actions || []);

    const before = await collectIssues(page);
    result.issues.before = before.count;
    writeJson(path.join(scenarioDir, "issues-before.json"), before);
    await page.screenshot({ path: path.join(scenarioDir, "before.png"), fullPage: true });

    let after = before;
    if (before.count > 0) {
      await page.bringToFront();
      await runFixWithRetry({
        context,
        scenarioName: scenario.name,
        geminiMock,
        runnerState,
        captureIntervalMs,
        log
      });
      after = await waitForIssuesCleared(page);
    } else {
      log.info(`Skipping fix for ${scenario.name} (no issues found)`);
    }
    result.issues.after = after.count;
    writeJson(path.join(scenarioDir, "issues-after.json"), after);
    await page.screenshot({ path: path.join(scenarioDir, "after.png"), fullPage: true });

    const requests = geminiMock.getRequests();
    const lastRequest =
      requests.filter((req) => req.example === scenario.name).slice(-1)[0] || null;
    if (lastRequest) {
      fs.writeFileSync(path.join(scenarioDir, "prompt.txt"), lastRequest.prompt || "");
      writeJson(path.join(scenarioDir, "labels.json"), lastRequest.labels || {});
    }

    const assertionResults = await runAssertions(page, scenario, { before, after });
    result.assertions = assertionResults;
    if (assertionResults.some((assertion) => !assertion.passed)) {
      result.status = "failed";
    }
  } catch (error) {
    result.status = "failed";
    result.error = error?.message || String(error);
  }

  writeJson(path.join(scenarioDir, "result.json"), result);
  return result;
}

async function run() {
  const config = loadScenarios(options.configPath);
  const scenarios = (config.examples || []).filter((scenario) => {
    if (!options.onlyExamples) {
      return true;
    }
    return options.onlyExamples.has(scenario.name);
  });

  if (!scenarios.length) {
    throw new Error("No scenarios matched the requested filters.");
  }

  ensureDir(options.artifactsDir);
  const runId = new Date().toISOString().replace(/[:.]/g, "-");
  const runDir = path.join(options.artifactsDir, runId);
  ensureDir(runDir);
  const logFile = path.join(runDir, "run.log");
  const log = createLogger(logFile);
  log.info(`Run start ${runId}`);
  log.info(`Config: ${options.configPath}`);
  log.info(`Headless: ${options.headless}`);
  log.info(`Port: ${options.port}`);
  log.info(`Capture interval: ${options.captureIntervalMs}ms`);
  if (options.onlyExamples) {
    log.info(`Filtered examples: ${Array.from(options.onlyExamples).join(", ")}`);
  }

  let context = null;
  let server = null;
  let baseUrl = "";
  const results = [];

  try {
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "webilluminator-e2e-"));
    context = await launchContext(userDataDir, log, options.verbose);

    try {
      const serverInfo = await startStaticServer({
        rootDir: path.join(repoRoot, "examples"),
        port: options.port
      });
      server = serverInfo.server;
      baseUrl = serverInfo.baseUrl;
      log.info(`Static server listening at ${baseUrl}`);
    } catch (error) {
      const code = error?.code;
      if (code !== "EPERM" && code !== "EACCES") {
        throw error;
      }
      baseUrl = "http://webilluminator.test";
      await setupStaticRoutes(context, {
        rootDir: path.join(repoRoot, "examples"),
        baseUrl
      });
      log.warn("Port blocked; using routed host http://webilluminator.test");
    }

    const geminiMock = createGeminiMock();
    await geminiMock.attach(context);
    log.info("Gemini mock attached");

    const worker = await getServiceWorker(context);
    await setApiKey(worker, "test-key");
    log.info("API key set");

    const page = await context.newPage();

    const runnerState = { lastFixAt: 0 };

    for (const scenario of scenarios) {
      log.info(`Running scenario ${scenario.name}`);
      const outcome = await runScenario({
        scenario,
        page,
        context,
        geminiMock,
        baseUrl,
        outputDir: runDir,
        runnerState,
        captureIntervalMs: options.captureIntervalMs,
        log
      });
      results.push(outcome);
      if (outcome.status !== "passed") {
        log.error(`Scenario failed: ${scenario.name}`, outcome.error || "");
      }
    }
  } finally {
    if (context) {
      await context.close();
    }
    if (server) {
      server.close();
    }
  }

  const report = {
    runId,
    startedAt: new Date().toISOString(),
    baseUrl,
    headless: options.headless,
    results
  };

  writeJson(path.join(runDir, "report.json"), report);
  log.info(`Report written to ${path.join(runDir, "report.json")}`);

  const failed = results.filter((result) => result.status !== "passed");
  if (failed.length) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  const message = error?.stack || error?.message || String(error);
  const log = createLogger();
  log.error("Failed:", message);
  process.exitCode = 1;
});
