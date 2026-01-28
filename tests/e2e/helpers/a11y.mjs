export async function collectIssues(page) {
  return page.evaluate(() => {
    const selector = [
      "button",
      "a[href]",
      "img",
      "input",
      "select",
      "textarea",
      "[role=\"button\"]",
      "[role=\"link\"]",
      "[role=\"checkbox\"]",
      "[role=\"switch\"]",
      "[role=\"tab\"]"
    ].join(",");

    const seen = new Set();
    const issues = [];

    function isVisible(element) {
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") {
        return false;
      }
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }

    function isIgnoredImage(element) {
      if (element.tagName !== "IMG") {
        return false;
      }
      if (element.getAttribute("alt") === "") {
        return true;
      }
      const role = element.getAttribute("role");
      if (role === "presentation") {
        return true;
      }
      if (element.getAttribute("aria-hidden") === "true") {
        return true;
      }
      return false;
    }

    function hasAccessibleName(element) {
      if (element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby")) {
        return true;
      }
      if (element.tagName === "IMG" && element.hasAttribute("alt")) {
        return true;
      }
      if (element.labels && element.labels.length > 0) {
        return true;
      }
      const text = element.textContent ? element.textContent.trim() : "";
      if (text) {
        return true;
      }
      if (element.tagName === "INPUT") {
        const type = (element.getAttribute("type") || "").toLowerCase();
        if (["button", "submit", "reset"].includes(type)) {
          return Boolean(element.value && element.value.trim());
        }
      }
      return false;
    }

    function buildShadowHostPath(hostChain) {
      if (!hostChain.length) {
        return "";
      }
      return hostChain
        .map((host) => {
          const tag = host.tagName.toLowerCase();
          const id = host.id ? `#${host.id}` : "";
          let classHint = "";
          if (typeof host.className === "string") {
            const classes = host.className.trim().split(/\s+/).filter(Boolean);
            if (classes.length) {
              classHint = `.${classes[0]}`;
            }
          }
          return `${tag}${id}${classHint}`;
        })
        .join(">");
    }

    function describeElement(element, hostChain) {
      const tag = element.tagName.toLowerCase();
      const parts = {
        tag,
        role: element.getAttribute("role") || "",
        type: element.getAttribute("type") || "",
        name: element.getAttribute("name") || "",
        placeholder: element.getAttribute("placeholder") || "",
        id: element.id || "",
        className: typeof element.className === "string" ? element.className.trim() : "",
        ariaLabel: element.getAttribute("aria-label") || "",
        alt: element.getAttribute("alt") || "",
        src: element.getAttribute("src") || "",
        shadowHost: buildShadowHostPath(hostChain || [])
      };
      parts.text = element.textContent ? element.textContent.trim().slice(0, 120) : "";
      return parts;
    }

    function walk(root, hostChain) {
      if (!root) {
        return;
      }
      const elements = root.querySelectorAll ? Array.from(root.querySelectorAll(selector)) : [];
      elements.forEach((element) => {
        if (seen.has(element)) {
          return;
        }
        if (element.closest(".webilluminator-overlay")) {
          return;
        }
        seen.add(element);
        if (!isVisible(element) || isIgnoredImage(element) || hasAccessibleName(element)) {
          return;
        }
        issues.push(describeElement(element, hostChain));
      });

      const all = root.querySelectorAll ? Array.from(root.querySelectorAll("*")) : [];
      all.forEach((element) => {
        if (element.shadowRoot) {
          walk(element.shadowRoot, hostChain.concat(element));
        }
      });
    }

    walk(document, []);

    return {
      count: issues.length,
      issues
    };
  });
}

export async function waitForIssuesCleared(page, { timeoutMs = 3000, pollMs = 200 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const result = await collectIssues(page);
    if (result.count === 0) {
      return result;
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
  return collectIssues(page);
}
