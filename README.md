# WebIlluminator

> **Illuminating the dark corners of the web.**

**WebIlluminator** (repo name: `lumina-a11y`) is an open-source browser extension designed to repair the "accessibility gap" on the modern web. Instead of replacing traditional screen readers, it acts as a **semantic repair agent**.

By leveraging the multimodal capabilities of **Google's Gemini 3**, WebIlluminator visually analyzes unlabelled UI elements (buttons, icons, complex graphics) and dynamically injects the missing ARIA labels back into the DOM.

---

## 🧐 The Problem

For the 300 million visually impaired users relying on screen readers (like [NVDA](https://www.nvaccess.org/download/) or [VoiceOver](https://support.apple.com/en-hk/guide/voiceover/welcome/mac)), the modern web is full of roadblocks.

- **Unlabelled Icons:** A shopping cart is often just `<button class="icon-v2"></button>`, which screen readers read as _"Button"_.
- **Complex Layouts:** Visual relationships are lost in the code structure.
- **Developer Lag:** Waiting for developers to fix accessibility bugs can take months.

## 💡 The Solution

WebIlluminator solves this using a **Visual Indexing** (Set-of-Marks) approach:

1. **Scan:** Identifies interactive elements missing accessibility tags (`aria-label`, `alt`).
2. **Tag:** Overlays temporary visual IDs (1, 2, 3...) on the screen.
3. **See:** Sends a snapshot to **Gemini 3 Flash**.
4. **Repair:** Gemini infers the function of each element (e.g., "Element #2 is a 'Search' button") and the extension updates the DOM instantly.

---

## 📂 Project Structure

This repository is organized as follows:

```text
lumina-a11y/
├── extension/          # The source code for the Chrome Extension (Manifest V3)
│   ├── manifest.json   # Extension configuration
│   ├── background.js   # Handles API calls to Google Gemini
│   ├── content.js      # Handles DOM scanning and label injection
│   └── popup/          # UI for settings (API Key management)
│
├── examples/           # "Bad" websites for demonstration purposes
│   ├── icon-only-buttons/
│   │   ├── index.html  # Icon-only controls with missing accessible names
│   │   └── style.css
│   ├── unlabeled-form/
│   │   ├── index.html  # Form fields without associated labels
│   │   └── style.css
│   ├── custom-controls/
│   │   ├── index.html  # Custom controls without semantic roles/keyboard support
│   │   └── style.css
│   └── missing-alt-text/
│       ├── index.html  # Images missing alt text, plus decorative/hidden examples
│       └── style.css
│
├── justfile            # Command runner for development tasks
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

- Google Chrome (or any Chromium-based browser like Edge/Brave).
- A **Google Gemini API Key** (Get one [here](https://www.google.com/search?q=https://aistudio.google.com/)).

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ukeSJTU/lumina-a11y.git
cd lumina-a11y

```

2. **Load into Chrome:**

- Open `chrome://extensions/`.
- Toggle **Developer mode** (top right).
- Click **Load unpacked**.
- Select the `extension/` folder from this project.

3. **Configure API Key:**

- Click the WebIlluminator icon in your browser toolbar.
- Enter your Gemini API Key.
- _Note: Your key is stored locally in your browser (`chrome.storage.local`) and is never sent to our servers._

---

## 🧪 How to Test (Demo)

We have provided a few "broken" websites to demonstrate the power of WebIlluminator.

1. **Launch an Example Page:**
   You can run a simple local server to view one example:

```bash
# With just
just server icon-only-buttons

# Or with python
python3 -m http.server 5500 --directory examples/icon-only-buttons

```

Replace `icon-only-buttons` with `unlabeled-form`, `custom-controls`, or `missing-alt-text` to try the other demos. Open `http://localhost:5500` in your browser.

2. **Verify the Issue:**

- Open your browser's DevTools or turn on a screen reader (NVDA/VoiceOver).
- `icon-only-buttons`: buttons have no accessible names.
- `unlabeled-form`: inputs rely on placeholders with no associated labels.
- `custom-controls`: interactive `<div>` elements have no roles or keyboard support.
- `missing-alt-text`: images omit `alt`, include decorative `alt=""`, and include images hidden with `aria-hidden="true"` (only the missing-alt images should be labeled).

3. **Run the Repair:**

- Click the WebIlluminator extension icon (or use the shortcut `Alt+R`).
- Wait a few seconds for Gemini 3 to analyze the UI.
- **Success!** The DOM is now patched. Inspect the elements again to see `aria-label="Search"`, `aria-label="Settings"`, or `alt="Trailhead at sunrise"`.

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Platform:** Chrome Extension Manifest V3
- **AI Model:** Google Gemini 3.0 Flash (via REST API)
- **Methodology:** Visual Prompting / Set-of-Marks (SoM)

## 🔒 Privacy & Security (BYOK)

WebIlluminator follows a **Bring Your Own Key (BYOK)** model.

- We do not operate a backend server.
- We do not collect user data.
- Screenshots are sent directly from your browser to Google's API solely for the purpose of analysis and are discarded immediately after processing.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

_Built for the [Google Gemini 3 Hackathon](https://gemini3.devpost.com/)._
