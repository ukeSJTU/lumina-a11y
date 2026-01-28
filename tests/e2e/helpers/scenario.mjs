export async function applyActions(page, actions = []) {
  for (const action of actions) {
    const type = action.type;
    if (type === "waitForSelector") {
      await page.waitForSelector(action.selector, { timeout: action.timeoutMs ?? 5000 });
      continue;
    }
    if (type === "click") {
      await page.click(action.selector);
      continue;
    }
    if (type === "press") {
      await page.press(action.selector, action.key);
      continue;
    }
    if (type === "waitForTimeout") {
      await page.waitForTimeout(action.timeoutMs ?? action.ms ?? 500);
      continue;
    }
    if (type === "scroll") {
      const repeat = action.repeat ?? 1;
      for (let i = 0; i < repeat; i += 1) {
        await page.evaluate(
          ({ selector, distance }) => {
            const target = document.querySelector(selector);
            if (!target) {
              throw new Error(`Missing scroll target: ${selector}`);
            }
            target.scrollTop += distance;
          },
          { selector: action.selector, distance: action.distance ?? 400 }
        );
        if (action.delayMs) {
          await page.waitForTimeout(action.delayMs);
        }
      }
      continue;
    }
    throw new Error(`Unknown action type: ${type}`);
  }
}

export async function runAssertions(page, scenario, { before, after }) {
  const results = [];
  const assertions = scenario.assertions || [];

  if (scenario.expectIssuesCleared !== false && before.count > 0) {
    results.push({
      name: "issues-cleared",
      passed: after.count === 0,
      details: {
        before: before.count,
        after: after.count
      }
    });
  }

  for (const assertion of assertions) {
    if (assertion.type === "expectAttribute") {
      const outcome = await page.evaluate(({ selector, attribute }) => {
        const elements = Array.from(document.querySelectorAll(selector));
        const missing = elements.filter((element) => {
          const value = element.getAttribute(attribute);
          return !value || !value.trim();
        });
        return {
          total: elements.length,
          missing: missing.map((element) => element.outerHTML.slice(0, 120))
        };
      }, assertion);
      results.push({
        name: `expectAttribute:${assertion.attribute}`,
        passed: outcome.total > 0 && outcome.missing.length === 0,
        details: outcome
      });
      continue;
    }

    if (assertion.type === "expectAttributeValue") {
      const outcome = await page.evaluate(({ selector, attribute, value }) => {
        const elements = Array.from(document.querySelectorAll(selector));
        const mismatched = elements.filter((element) => element.getAttribute(attribute) !== value);
        return {
          total: elements.length,
          mismatched: mismatched.map((element) => element.outerHTML.slice(0, 120))
        };
      }, assertion);
      results.push({
        name: `expectAttributeValue:${assertion.attribute}`,
        passed: outcome.total > 0 && outcome.mismatched.length === 0,
        details: outcome
      });
      continue;
    }

    if (assertion.type === "expectAttributeMissing") {
      const outcome = await page.evaluate(({ selector, attribute }) => {
        const elements = Array.from(document.querySelectorAll(selector));
        const present = elements.filter((element) => element.hasAttribute(attribute));
        return {
          total: elements.length,
          present: present.map((element) => element.outerHTML.slice(0, 120))
        };
      }, assertion);
      results.push({
        name: `expectAttributeMissing:${assertion.attribute}`,
        passed: outcome.total > 0 && outcome.present.length === 0,
        details: outcome
      });
      continue;
    }

    if (assertion.type === "expectIssueCount") {
      const maxAfter = assertion.maxAfter;
      const equalsAfter = assertion.equalsAfter;
      let passed = true;
      if (typeof equalsAfter === "number") {
        passed = after.count === equalsAfter;
      } else if (typeof maxAfter === "number") {
        passed = after.count <= maxAfter;
      }
      results.push({
        name: "expectIssueCount",
        passed,
        details: {
          before: before.count,
          after: after.count,
          maxAfter,
          equalsAfter
        }
      });
      continue;
    }

    results.push({
      name: `unknown:${assertion.type}`,
      passed: false,
      details: { assertion }
    });
  }

  return results;
}
