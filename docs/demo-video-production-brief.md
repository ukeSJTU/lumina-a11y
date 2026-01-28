# WebIlluminator Demo Video - Production Brief (3:00)

## Goal
Create a 3-minute demo video for the hackathon submission that explains the problem, shows how WebIlluminator works, and proves the results with a focused demo. The tone is confident, human, and practical.

## Format
- Length: 3:00 (180 seconds)
- Aspect: 16:9 (1920x1080)
- Frame rate: 30 fps
- Style: Dark, minimal, high-contrast, modern UI overlays
- Footage: no live camera or screen recordings; all visuals are synthetic in Remotion

## Visual Design System
- Background: #0C0F14
- Text: #F4F6F8
- Accent: #48E2C2
- Alert: #FF5C5C
- Grid: 12 columns, 80px safe margins
- Type scale:
  - H1: 72 (bold)
  - H2: 48 (semibold)
  - Body: 30 (regular)
- UI elements: lower-third captions, step cards, callout bubbles, highlight rings, SoM number overlays, split-screen divider
- Mock UI: pixel-perfect browser chrome with skeleton text blocks; only the target icons are rendered in full detail
- Motion: fast cuts in problem section, smooth wipes for solution, heavy spring pops for labels and SoM numbers

## Audio Direction
- Narration: ElevenLabs (Model: Multilingual v2), voice "Brian" or "Onyx", calm and authoritative
- Screen reader lines are on-screen captions and audible
- Subtle ambient bed (low volume)
- SFX: scanning hums, label pop sounds, and a satisfying success chime

## Build Requirements (for programmers)
- No screen recordings. All visuals are synthetic in Remotion.
- Build a reusable Mock Browser UI with browser chrome, address bar, and tab strip.
- Use skeleton blocks for non-essential content (text and images).
- Render only target icons in full detail to spotlight fixes.
- Provide a component-based effects toolkit for scan beams, SoM tags, label pills, and callout bubbles.

## Component Glossary (Remotion)
- `MockBrowser`: full frame browser shell with padding and grid alignment
- `SkeletonBlock`: placeholder text/image rectangles for background content
- `IconButton`: target icon with hover outline and glow
- `ScanningBeam`: animated pass that sweeps across the mock UI
- `SoMTag`: number overlay tied to each icon
- `GeminiCallout`: response bubble listing inferred labels
- `LabelPill`: ARIA label badge that pops in with a spring
- `StepRail`: vertical list of steps with active highlight
- `FlowDiagram`: privacy pipeline diagram nodes + connectors

## Full Script With On-Screen Text + Layout Notes

### 0:00-0:15 (Hook)
Narration: "For millions, the web sounds like this."
On-screen text: "Millions hear the web like this."
Layout: Black screen, thin waveform center. Ghosted icons fade in. Bottom-center captions. Screen reader voice: "Button. Button. Button."

### 0:15-0:35 (Problem: unlabeled icons)
Narration: "Modern sites are filled with icons and custom components that often ship without labels."
On-screen text: "Unlabeled icons" and "Screen readers: 'Button.'"
Layout: Left 70% shows site with icon-only buttons. Right 30% stack of repeating "Button" lines. Red outlines on unlabeled controls.

### 0:35-0:55 (Impact)
Narration: "That turns shopping carts, menus, and controls into guessing games."
On-screen text: "Friction." "Lost time." "Exclusion."
Layout: Three stacked cards slide in and out, each with a simple icon and keyword.

### 0:55-1:10 (Reveal)
Narration: "WebIlluminator repairs missing semantics instantly."
On-screen text: "WebIlluminator" + "Illuminate the dark corners of the web."
Layout: Logo center. Extension icon pops in. Small badge: "One click."

### 1:10-1:40 (How it works)
Narration: "Here is how it works. It scans for missing labels, tags the UI with visual IDs, sends a snapshot to Gemini, then injects ARIA labels back into the DOM. Under the hood: intent recognition, SPA focus management for dynamic updates, and Shadow DOM piercing so AI sees what code hides."
On-screen text: "1 Scan  2 Tag  3 See  4 Repair" + "Intent Recognition" + "SPA Focus Management" + "Shadow DOM Piercing"
Layout: Left vertical step list with active highlight. Right main view: MockBrowser with SoM numbers and Gemini callout. Three tech callout chips stack in the upper-right.

### 1:40-1:55 (Live demo - Before)
Narration: "Let's watch it in action. On this UI the search, cart, and close buttons are unlabeled."
On-screen text: "Before"
Layout: Split screen 50/50; left uses MockBrowser with skeleton content and three icon-only buttons. Highlight rings land on the icons.

### 1:55-2:10 (Live demo - Action)
Narration: "Press Alt plus R. The page is tagged, Gemini responds, and the labels appear."
On-screen text: "Alt+R"
Layout: Keystroke overlay. SoM numbers appear. Gemini response bubble: "#1 Search", "#2 Cart", "#3 Close".

### 2:10-2:20 (Live demo - After)
Narration: "The screen reader now says 'Search', 'Cart', 'Close'."
On-screen text: "After"
Layout: Right side fills the screen with MockBrowser; label pills snap in with spring, captions show the three words as they are read.

### 2:20-2:40 (Privacy)
Narration: "Your key stays in your browser. No backend, no stored data. Screenshots go directly to Gemini, then disappear."
On-screen text: "BYOK" "No backend" "No data stored"
Layout: Simple flow diagram: Browser -> Gemini -> Labels -> DOM. Each node is a rounded card.

### 2:40-2:55 (Benefits)
Narration: "Developers get instant fixes. Users get independence. Accessibility improves now, not later."
On-screen text: "Instant repair" "Developer-friendly" "User-first"
Layout: Three horizontal icon cards with soft glow.

### 2:55-3:00 (Close)
Narration: "WebIlluminator. Illuminate the dark corners of the web."
On-screen text: Logo + repo URL + hackathon logo
Layout: Center lockup, slow fade to black.

## Shot List
See `docs/demo-video-timing.csv` for the timing spreadsheet with timecodes and shot details.

## Asset Checklist
- WebIlluminator logo (SVG/PNG)
- Extension icon (PNG)
- Icon glyphs (SVG) for search/cart/close
- Gemini response bubble mock (vector or Figma export)
- Screen reader voice clips (TTS or actual screen reader capture)
- Ambient background music (low volume)
- UI icons for cards (search, cart, close, privacy, developer, user)
