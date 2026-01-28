import http from "http";
import fs from "fs";
import path from "path";

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif"
};

function resolveFile(rootDir, requestPath) {
  let pathname = decodeURIComponent(requestPath || "/");
  if (pathname.endsWith("/")) {
    pathname += "index.html";
  }
  pathname = pathname.replace(/^\/+/, "");
  const filePath = path.normalize(path.join(rootDir, pathname));
  if (!filePath.startsWith(rootDir)) {
    return { error: 403 };
  }
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    return {
      data,
      contentType: MIME_TYPES[ext] || "application/octet-stream"
    };
  } catch (error) {
    return { error: 404 };
  }
}

export function startStaticServer({ rootDir, port, host = "127.0.0.1" }) {
  const resolvedRoot = path.resolve(rootDir);
  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url || "/", "http://localhost");
    const result = resolveFile(resolvedRoot, requestUrl.pathname);
    if (result.error === 403) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    if (result.error === 404) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": result.contentType });
    res.end(result.data);
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(port, host, () => {
      resolve({
        server,
        baseUrl: `http://${host}:${port}`
      });
    });
  });
}

export async function setupStaticRoutes(context, { rootDir, baseUrl }) {
  const resolvedRoot = path.resolve(rootDir);
  const origin = new URL(baseUrl).origin;
  await context.route(`${origin}/**`, async (route) => {
    const requestUrl = new URL(route.request().url());
    const result = resolveFile(resolvedRoot, requestUrl.pathname);
    if (result.error === 403) {
      await route.fulfill({ status: 403, body: "Forbidden" });
      return;
    }
    if (result.error === 404) {
      await route.fulfill({ status: 404, body: "Not found" });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: { "content-type": result.contentType },
      body: result.data
    });
  });
}
