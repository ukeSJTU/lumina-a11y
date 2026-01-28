export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;

export type ShotSpec = {
  id: string;
  title: string;
  startFrame: number;
  durationInFrames: number;
  narration: string;
  onScreenText: string;
  visuals: string;
  audioNotes: string;
  notes: string;
};

export const SHOT_SPECS: ShotSpec[] = [
  {
    id: "S01",
    title: "Hook / Silence to noise",
    startFrame: 0,
    durationInFrames: 450,
    narration: "For millions, the web sounds like this.",
    onScreenText: "Millions hear the web like this.",
    visuals:
      "Use <FullScreenBlack />, <Waveform />, and <GhostIconCloud /> with soft fades.",
    audioNotes: "Screen reader: 'Button. Button. Button.'",
    notes: "Keep captions bottom-center",
  },
  {
    id: "S02",
    title: "Problem / Unlabeled icons",
    startFrame: 450,
    durationInFrames: 600,
    narration:
      "Modern sites are filled with icons and custom components that often ship without labels.",
    onScreenText: "Unlabeled icons / Screen readers: 'Button.'",
    visuals:
      "Use <MockBrowser /> + <SkeletonBlock />; target <IconButton />s outlined with <OutlinePulse />; <ScreenReaderStack /> on right.",
    audioNotes: "Ambient bed low",
    notes: "Cut fast",
  },
  {
    id: "S03",
    title: "Impact / Guessing game",
    startFrame: 1050,
    durationInFrames: 600,
    narration:
      "That turns shopping carts, menus, and controls into guessing games.",
    onScreenText: "Friction. / Lost time. / Exclusion.",
    visuals: "Use <ImpactCardRow /> with SVG icons; cards slide in/out.",
    audioNotes: "Short whoosh SFX on each card",
    notes: "Snap transitions",
  },
  {
    id: "S04",
    title: "Reveal / Logo intro",
    startFrame: 1650,
    durationInFrames: 450,
    narration: "WebIlluminator repairs missing semantics instantly.",
    onScreenText: "WebIlluminator / Illuminate the dark corners of the web.",
    visuals: "Use <LogoLockup /> + <ExtensionBadge /> with subtle glow.",
    audioNotes: "Bed continues",
    notes: "Hold for readability",
  },
  {
    id: "S05",
    title: "How it works / Scan to repair",
    startFrame: 2100,
    durationInFrames: 900,
    narration:
      "Here is how it works. It scans for missing labels, tags the UI with visual IDs, sends a snapshot to Gemini, then injects ARIA labels back into the DOM. Under the hood: intent recognition, SPA focus management, and Shadow DOM piercing.",
    onScreenText:
      "1 Scan  2 Tag  3 See  4 Repair / Intent Recognition / SPA Focus Management / Shadow DOM Piercing",
    visuals:
      "Use <StepRail /> left; right <MockBrowser /> with <ScanningBeam />, <SoMTag />, <GeminiCallout />, and <LabelPill /> (spring). Add <TechChipStack /> upper-right.",
    audioNotes: "Scanning hum begins + light UI blips",
    notes: "Smooth wipe into/out of this section",
  },
  {
    id: "S06",
    title: "Demo (before) / Unlabeled state",
    startFrame: 3000,
    durationInFrames: 450,
    narration:
      "Let's watch it in action. On this UI the search, cart, and close buttons are unlabeled.",
    onScreenText: "Before",
    visuals:
      "Split screen with two <MockBrowser /> states; left shows skeleton content and three unlabeled <IconButton />s with <HighlightRing />.",
    audioNotes: "Ambient bed low",
    notes: "Keep labels hidden",
  },
  {
    id: "S07",
    title: "Demo (action) / Activation",
    startFrame: 3450,
    durationInFrames: 450,
    narration:
      "Press Alt plus R. The page is tagged, Gemini responds, and the labels appear.",
    onScreenText: "Alt+R",
    visuals:
      "Show <KeystrokeOverlay />, then <ScanningBeam /> sweep; <SoMTag /> numbers and <GeminiCallout /> appear; <LabelPill /> pops in with heavy spring.",
    audioNotes: "Scanning hum + label pop SFX + success chime",
    notes: "Show cursor press",
  },
  {
    id: "S08",
    title: "Demo (after) / Labeled state",
    startFrame: 3900,
    durationInFrames: 300,
    narration: "The screen reader now says 'Search', 'Cart', 'Close'.",
    onScreenText: "After",
    visuals:
      "Full-frame <MockBrowser /> labeled state; <LabelPill />s remain visible; <CaptionStack /> shows spoken words.",
    audioNotes: "Screen reader voice speaks labels",
    notes: "Hold long enough to read",
  },
  {
    id: "S09",
    title: "Privacy / BYOK flow",
    startFrame: 4200,
    durationInFrames: 600,
    narration:
      "Your key stays in your browser. No backend, no stored data. Screenshots go directly to Gemini, then disappear.",
    onScreenText: "BYOK / No backend / No data stored",
    visuals:
      "Use <FlowDiagram /> nodes (Browser, Gemini, Labels, DOM) with connectors.",
    audioNotes: "Gentle whoosh between nodes",
    notes: "Minimal motion",
  },
  {
    id: "S10",
    title: "Benefits / Who wins",
    startFrame: 4800,
    durationInFrames: 450,
    narration:
      "Developers get instant fixes. Users get independence. Accessibility improves now, not later.",
    onScreenText: "Instant repair / Developer-friendly / User-first",
    visuals: "Use <BenefitCardRow /> with icon glyphs and soft glow.",
    audioNotes: "Bed rises slightly",
    notes: "Align icons to grid",
  },
  {
    id: "S11",
    title: "Close / Final lockup",
    startFrame: 5250,
    durationInFrames: 150,
    narration:
      "WebIlluminator. Illuminate the dark corners of the web.",
    onScreenText: "Logo + repo URL + hackathon logo",
    visuals: "Use <LogoLockup /> with fade to black.",
    audioNotes: "Bed fade out",
    notes: "Keep clean",
  },
];

export const TOTAL_DURATION_IN_FRAMES =
  SHOT_SPECS[SHOT_SPECS.length - 1].startFrame +
  SHOT_SPECS[SHOT_SPECS.length - 1].durationInFrames;
