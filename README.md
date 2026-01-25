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
├── demo/               # Remotion video source files for the project demo
├── docs/               # Project-related documents and research report
├── extension/          # The source code for the Chrome Extension (Manifest V3)
│   ├── manifest.json   # Extension configuration
│   ├── background.js   # Handles API calls to Google Gemini
│   ├── content.js      # Handles DOM scanning and label injection
│   └── popup/          # UI for settings (API Key management)
│
├── examples/           # Demo websites showcasing accessibility issues (see examples/README.md)
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

We provide several example websites that demonstrate common accessibility issues. For detailed information about each example and testing instructions, see the [examples/README.md](./examples/README.md).

**Quick start:**

```bash
# With just
just server icon-only-buttons

# Or with python
python3 -m http.server 5500 --directory examples/icon-only-buttons
```

Then open `http://localhost:5500`, click the WebIlluminator extension icon (or press `Alt+R`), and watch as missing labels are automatically added to the page.

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
