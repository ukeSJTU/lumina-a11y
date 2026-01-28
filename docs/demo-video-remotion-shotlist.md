# Remotion Shot List (Derived from demo-video-timing.csv)

## Composition Settings
- Resolution: 1920x1080 (16:9)
- Frame rate: 30 fps
- Duration: 180s (5400 frames)
- Style: Dark, minimal, high-contrast; synthetic visuals only

## Shot Timing + Remotion Notes
Frame ranges are start inclusive, end exclusive.

| shot_id | start_tc | end_tc | duration_s | start_frame | duration_frames | segment/title | narration | on_screen_text | remotion_components | audio_notes | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | 00:00 | 00:15 | 15 | 0 | 450 | Hook / Silence to noise | For millions, the web sounds like this. | Millions hear the web like this. | FullScreenBlack, Waveform, GhostIconCloud, BottomCaptions | Screen reader: "Button. Button. Button." | Soft fades; captions bottom-center |
| S02 | 00:15 | 00:35 | 20 | 450 | 600 | Problem / Unlabeled icons | Modern sites are filled with icons and custom components that often ship without labels. | Unlabeled icons / Screen readers: "Button." | MockBrowser, SkeletonBlock, IconButton, OutlinePulse, ScreenReaderStack | Ambient bed low | Fast cuts |
| S03 | 00:35 | 00:55 | 20 | 1050 | 600 | Impact / Guessing game | That turns shopping carts, menus, and controls into guessing games. | Friction. / Lost time. / Exclusion. | ImpactCardRow | Whoosh SFX per card | Snap transitions |
| S04 | 00:55 | 01:10 | 15 | 1650 | 450 | Reveal / Logo intro | WebIlluminator repairs missing semantics instantly. | WebIlluminator / Illuminate the dark corners of the web. | LogoLockup, ExtensionBadge | Bed continues | Hold for readability |
| S05 | 01:10 | 01:40 | 30 | 2100 | 900 | How it works / Scan to repair | Here is how it works... intent recognition, SPA focus management, and Shadow DOM piercing. | 1 Scan 2 Tag 3 See 4 Repair / Intent Recognition / SPA Focus Management / Shadow DOM Piercing | StepRail, MockBrowser, ScanningBeam, SoMTag, GeminiCallout, LabelPill, TechChipStack | Scanning hum + light UI blips | Smooth wipe in/out |
| S06 | 01:40 | 01:55 | 15 | 3000 | 450 | Demo (before) / Unlabeled state | Let's watch it in action. On this UI the search, cart, and close buttons are unlabeled. | Before | SplitScreen, MockBrowser, SkeletonBlock, IconButton, HighlightRing | Ambient bed low | Keep labels hidden |
| S07 | 01:55 | 02:10 | 15 | 3450 | 450 | Demo (action) / Activation | Press Alt plus R. The page is tagged, Gemini responds, and the labels appear. | Alt+R | KeystrokeOverlay, ScanningBeam, SoMTag, GeminiCallout, LabelPill | Scanning hum + label pop + success chime | Show cursor press |
| S08 | 02:10 | 02:20 | 10 | 3900 | 300 | Demo (after) / Labeled state | The screen reader now says "Search", "Cart", "Close". | After | MockBrowser, LabelPill, CaptionStack | Screen reader speaks labels | Hold to read |
| S09 | 02:20 | 02:40 | 20 | 4200 | 600 | Privacy / BYOK flow | Your key stays in your browser. No backend, no stored data. Screenshots go directly to Gemini, then disappear. | BYOK / No backend / No data stored | FlowDiagram | Gentle whoosh between nodes | Minimal motion |
| S10 | 02:40 | 02:55 | 15 | 4800 | 450 | Benefits / Who wins | Developers get instant fixes. Users get independence. Accessibility improves now, not later. | Instant repair / Developer-friendly / User-first | BenefitCardRow | Bed rises slightly | Align icons to grid |
| S11 | 02:55 | 03:00 | 5 | 5250 | 150 | Close / Final lockup | WebIlluminator. Illuminate the dark corners of the web. | Logo + repo URL + hackathon logo | LogoLockup | Bed fade out | Fade to black |

## Sequencing Hint (Remotion)
Use a parent composition with sequential <Sequence> blocks:
- from = start_frame
- durationInFrames = duration_frames

This lines up directly with the table above.
