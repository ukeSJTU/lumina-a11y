# Examples

This directory contains a collection of "broken" websites that demonstrate common accessibility issues. These examples are designed to showcase how WebIlluminator can repair missing semantic information using visual AI analysis.

## 📂 Available Examples

### 1. Icon-Only Buttons (`icon-only-buttons/`)
- **Issue:** Buttons with icon fonts that have no accessible names
- **Elements:** Multiple icon buttons (search, settings, user profile, etc.) without `aria-label`
- **What to test:** Screen readers will only announce "Button" without describing the function

### 2. Unlabeled Form (`unlabeled-form/`)
- **Issue:** Form fields that rely solely on placeholder text without proper labels
- **Elements:** Input fields without associated `<label>` elements or `aria-label`
- **What to test:** Form fields are not properly announced or navigable

### 3. Custom Controls (`custom-controls/`)
- **Issue:** Interactive elements built with `<div>` without semantic roles or keyboard support
- **Elements:** Custom controls lacking ARIA roles and keyboard event handlers
- **What to test:** Non-standard controls that aren't accessible via keyboard or screen reader

### 4. Missing Alt Text (`missing-alt-text/`)
- **Issue:** Images without alternative text, mixed with decorative and hidden images
- **Elements:** 
  - Images missing `alt` attributes (should be labeled)
  - Decorative images with `alt=""` (should be ignored)
  - Images with `aria-hidden="true"` (should be ignored)
- **What to test:** Only images genuinely missing descriptive alt text should be labeled

### 5. Web Components - Shallow Shadow DOM (`web-components-shallow/`)
- **Issue:** Icon-only buttons and images without alt text inside a single-level open Shadow DOM
- **Elements:** Custom web components with shallow shadow roots
- **What to test:** WebIlluminator's ability to traverse and repair open Shadow DOM

### 6. Web Components - Deep Shadow DOM (`web-components-deep/`)
- **Issue:** Icon-only buttons and images without alt text inside nested open Shadow DOMs
- **Elements:** Multiple levels of shadow roots with accessibility issues
- **What to test:** Deep traversal of nested shadow DOM structures

### 7. Web Components - Mixed Shadow DOM (`web-components-mixed/`)
- **Issue:** Combined examples with both shallow and deeply nested Shadow DOM
- **Elements:** A comprehensive test case combining multiple Shadow DOM patterns
- **What to test:** Complex scenarios with mixed Shadow DOM depths

## 🧪 How to Test

### Method 1: Using the Justfile (Recommended)

If you have [just](https://github.com/casey/just) installed:

```bash
# Start a local server for any example
just server icon-only-buttons
```

Replace `icon-only-buttons` with any of the example folder names above.

### Method 2: Using Python

```bash
# Navigate to the example directory
cd examples/icon-only-buttons

# Start a simple HTTP server
python3 -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## 🔍 Testing Workflow

1. **Open an example page** using one of the methods above
2. **Verify the accessibility issues:**
   - Open Chrome DevTools (F12)
   - Try using a screen reader (NVDA on Windows, VoiceOver on Mac)
   - Navigate using only your keyboard (Tab key)
   - Notice how elements are missing descriptions or semantic information
3. **Run WebIlluminator:**
   - Click the extension icon in your browser toolbar (or press `Alt+R`)
   - Wait a few seconds for the AI analysis
4. **Verify the repair:**
   - Re-inspect the elements in DevTools
   - You should see new `aria-label` attributes on buttons
   - Images should have `alt` text
   - Try the screen reader again - elements should now be properly announced

## 🎯 What Gets Repaired

WebIlluminator uses visual AI (Google Gemini 3) to:
- Add `aria-label` to unlabeled interactive elements
- Add `alt` text to images that are missing descriptions
- Traverse and repair elements inside open Shadow DOM structures
- Intelligently skip decorative or already-hidden elements

## 📝 Notes

- All examples use simple HTML/CSS to isolate specific accessibility issues
- Examples are intentionally "broken" to demonstrate real-world problems
- These patterns are commonly found in production websites
- WebIlluminator patches the DOM in real-time without requiring code changes