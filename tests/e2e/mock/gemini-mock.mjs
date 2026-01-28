const DEFAULT_HOSTS = [
  "https://jp.duckcoding.com",
  "https://generativelanguage.googleapis.com"
];

function extractPrompt(payload) {
  if (!payload || !payload.contents || !payload.contents.length) {
    return "";
  }
  const parts = payload.contents[0]?.parts || [];
  const textPart = parts.find((part) => typeof part.text === "string");
  return textPart ? textPart.text : "";
}

function parseElements(prompt) {
  const lines = String(prompt || "").split(/\r?\n/);
  const elementsIndex = lines.findIndex((line) => line.trim() === "Elements:");
  const slice = elementsIndex >= 0 ? lines.slice(elementsIndex + 1) : lines;
  const elements = [];
  slice.forEach((line) => {
    const match = line.match(/^#(\d+):\s*(.*)$/);
    if (!match) {
      return;
    }
    elements.push({ id: Number(match[1]), description: match[2] });
  });
  return elements;
}

function pickHint(description) {
  const hintKeys = ["placeholder", "name", "title", "caption", "id", "class", "type"];
  for (const key of hintKeys) {
    const match = description.match(new RegExp(`${key}=([^\\s]+(?:\\s[^\\s]+)*)`));
    if (match && match[1]) {
      return match[1].replace(/["']/g, "").trim();
    }
  }
  return "";
}

function labelFromDescription(description, id) {
  const desc = description.toLowerCase();
  const hint = pickHint(description);
  if (desc.includes("tag=img")) {
    return hint ? `Image ${hint}` : `Image ${id}`;
  }
  if (desc.includes("role=checkbox") || desc.includes("type=checkbox")) {
    return hint ? `Checkbox ${hint}` : `Checkbox ${id}`;
  }
  if (desc.includes("role=radio") || desc.includes("type=radio")) {
    return hint ? `Radio ${hint}` : `Radio ${id}`;
  }
  if (desc.includes("tag=a") || desc.includes("role=link")) {
    return hint ? `Link ${hint}` : `Link ${id}`;
  }
  if (desc.includes("tag=button") || desc.includes("role=button")) {
    return hint ? `Button ${hint}` : `Button ${id}`;
  }
  if (desc.includes("tag=input") || desc.includes("tag=textarea") || desc.includes("tag=select")) {
    return hint ? `Input ${hint}` : `Input ${id}`;
  }
  return hint ? `Element ${hint}` : `Element ${id}`;
}

function buildLabels(prompt) {
  const elements = parseElements(prompt);
  const labels = {};
  elements.forEach((element) => {
    labels[String(element.id)] = labelFromDescription(element.description || "", element.id);
  });
  return labels;
}

function buildMockResponse(labels) {
  return {
    candidates: [
      {
        content: {
          parts: [{ text: JSON.stringify(labels) }]
        }
      }
    ]
  };
}

export function createGeminiMock({ hosts = DEFAULT_HOSTS } = {}) {
  const state = {
    currentExample: null,
    requests: []
  };

  function setCurrentExample(name) {
    state.currentExample = name || null;
  }

  function getRequests() {
    return state.requests.slice();
  }

  function getLastRequest() {
    return state.requests[state.requests.length - 1] || null;
  }

  async function attach(context) {
    await Promise.all(
      hosts.map((host) =>
        context.route(`${host}/**`, async (route) => {
          const request = route.request();
          const postData = request.postData() || "";
          let payload = null;
          try {
            payload = JSON.parse(postData);
          } catch (error) {
            payload = null;
          }
          const prompt = extractPrompt(payload);
          const labels = buildLabels(prompt);
          const responseBody = buildMockResponse(labels);
          state.requests.push({
            example: state.currentExample,
            url: request.url(),
            prompt,
            labels,
            timestamp: new Date().toISOString()
          });
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(responseBody)
          });
        })
      )
    );
  }

  return {
    attach,
    setCurrentExample,
    getRequests,
    getLastRequest
  };
}
