## ADDED Requirements
### Requirement: S04 reveal shot visuals
The demo video SHALL render the S04 "Reveal / Logo intro" segment using the scripted layout from `docs/demo-video-timing.csv`, featuring a centered typographic WebIlluminator logotype, the tagline "Illuminate the dark corners of the web.", a vector extension badge that pops in, and a small "One click." badge.

#### Scenario: Render the S04 reveal shot
- **WHEN** `DemoShot-S04` is rendered
- **THEN** the scene shows the logotype, tagline, extension badge pop-in, and "One click." badge on the dark background

### Requirement: S05 how-it-works shot visuals
The demo video SHALL render the S05 "How it works / Scan to repair" segment using the scripted layout from `docs/demo-video-timing.csv`, including a left step rail listing "1 Scan", "2 Tag", "3 See", "4 Repair" with an active highlight, a right MockBrowser with a scanning beam, SoM tags, Gemini callout, and label pill, plus an upper-right tech chip stack reading "Intent Recognition", "SPA Focus Management", and "Shadow DOM Piercing".

#### Scenario: Render the S05 how-it-works shot
- **WHEN** `DemoShot-S05` is rendered
- **THEN** the scene shows the step rail, scan beam, SoM tags, Gemini callout, label pill, and tech chips as scripted

### Requirement: S06 demo-before shot visuals
The demo video SHALL render the S06 "Demo (before) / Unlabeled state" segment using the scripted layout from `docs/demo-video-timing.csv`, with a 50/50 split screen of two MockBrowser panels, the left panel showing skeleton content and three unlabeled icon buttons (search, cart, close) with highlight rings and the right panel reserved for the comparison state with labels hidden.

#### Scenario: Render the S06 demo-before shot
- **WHEN** `DemoShot-S06` is rendered
- **THEN** the scene shows the split screen with the unlabeled icon buttons and highlight rings on the left panel

### Requirement: S07 demo-action shot visuals
The demo video SHALL render the S07 "Demo (action) / Activation" segment using the scripted layout from `docs/demo-video-timing.csv`, showing a keystroke overlay "Alt+R", a scanning beam sweep, SoM tags numbered 1-3, a Gemini callout listing "#1 Search", "#2 Cart", and "#3 Close", and label pills that pop in with a heavy spring.

#### Scenario: Render the S07 demo-action shot
- **WHEN** `DemoShot-S07` is rendered
- **THEN** the scene shows the keystroke overlay, scan beam, SoM tags, Gemini callout, and label pills as scripted

### Requirement: S08 demo-after shot visuals
The demo video SHALL render the S08 "Demo (after) / Labeled state" segment using the scripted layout from `docs/demo-video-timing.csv`, showing a full-frame MockBrowser labeled state with label pills visible and a caption stack that displays "Search", "Cart", and "Close".

#### Scenario: Render the S08 demo-after shot
- **WHEN** `DemoShot-S08` is rendered
- **THEN** the scene shows the labeled MockBrowser with label pills and the caption stack for the spoken words

### Requirement: S09 privacy shot visuals
The demo video SHALL render the S09 "Privacy / BYOK flow" segment using the scripted layout from `docs/demo-video-timing.csv`, showing a flow diagram of rounded nodes labeled "Browser", "Gemini", "Labels", and "DOM" with connectors, plus on-screen chips reading "BYOK", "No backend", and "No data stored".

#### Scenario: Render the S09 privacy shot
- **WHEN** `DemoShot-S09` is rendered
- **THEN** the scene shows the flow diagram and privacy chips as scripted

### Requirement: S10 benefits shot visuals
The demo video SHALL render the S10 "Benefits / Who wins" segment using the scripted layout from `docs/demo-video-timing.csv`, showing three horizontal icon cards with soft glow labeled "Instant repair", "Developer-friendly", and "User-first".

#### Scenario: Render the S10 benefits shot
- **WHEN** `DemoShot-S10` is rendered
- **THEN** the scene shows the three benefit cards with icons and labels

### Requirement: S11 close shot visuals
The demo video SHALL render the S11 "Close / Final lockup" segment using the scripted layout from `docs/demo-video-timing.csv`, featuring a centered typographic WebIlluminator lockup, the tagline "Illuminate the dark corners of the web.", the repo URL "https://github.com/ukeSJTU/lumina-a11y", and a "Google Hackathon" badge placeholder with a fade to black.

#### Scenario: Render the S11 close shot
- **WHEN** `DemoShot-S11` is rendered
- **THEN** the scene shows the lockup, repo URL, and "Google Hackathon" badge placeholder before fading out
