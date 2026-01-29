import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  GeminiCallout,
  LabelPill,
  ScanningBeam,
  SoMTag,
  StepRail,
  TechChipStack,
} from "../components/ShotElements";
import { IconButton, MockBrowser, SkeletonBlock } from "../components/MockUI";

const BACKGROUND_COLOR = "#0C0F14";
const TEXT_COLOR = "#F4F6F8";

const FALLBACK_STEPS = ["1 Scan", "2 Tag", "3 See", "4 Repair"];
const FALLBACK_CHIPS = [
  "Intent Recognition",
  "SPA Focus Management",
  "Shadow DOM Piercing",
];

type S05HowItWorksShotProps = {
  onScreenText: string;
};

const TaggedIcon: React.FC<{
  variant: "search" | "cart" | "close";
  tagNumber: number;
  delay: number;
}> = ({ variant, tagNumber, delay }) => {
  const size = 52;

  return (
    <div style={{ position: "relative" }}>
      <SoMTag
        number={tagNumber}
        delay={delay}
        style={{ position: "absolute", top: -12, left: -12 }}
      />
      <IconButton variant={variant} size={size} />
    </div>
  );
};

export const S05HowItWorksShot: React.FC<S05HowItWorksShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const [stepsText, ...chipSegments] = onScreenText
    .split(" / ")
    .map((segment) => segment.trim())
    .filter(Boolean);
  const steps = stepsText
    ? stepsText.split(/\s{2,}/).map((step) => step.trim())
    : FALLBACK_STEPS;
  const chips = chipSegments.length > 0 ? chipSegments : FALLBACK_CHIPS;
  const activeIndex = Math.min(
    steps.length - 1,
    Math.floor((frame / durationInFrames) * steps.length),
  );

  const fadeIn = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 0.8 * fps, durationInFrames - 0.2 * fps],
    [1, 0],
    {
      extrapolateRight: "clamp",
    },
  );
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND_COLOR }}>
      <div
        style={{
          display: "flex",
          gap: 40,
          padding: "80px 90px",
          height: "100%",
          opacity: sceneOpacity,
        }}
      >
        <div
          style={{
            flex: 0.32,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 42,
              fontWeight: 700,
              color: TEXT_COLOR,
            }}
          >
            How it works
          </div>
          <StepRail steps={steps} activeIndex={activeIndex} />
        </div>
        <div style={{ flex: 0.68, position: "relative" }}>
          <MockBrowser>
            <SkeletonBlock
              x={0}
              y={0}
              width="100%"
              height={160}
              radius={20}
              opacity={0.12}
            />
            <SkeletonBlock
              x={0}
              y={190}
              width="70%"
              height={22}
              radius={12}
              opacity={0.1}
            />
            <SkeletonBlock
              x={0}
              y={225}
              width="80%"
              height={22}
              radius={12}
              opacity={0.1}
            />
            <SkeletonBlock
              x={0}
              y={260}
              width="60%"
              height={22}
              radius={12}
              opacity={0.1}
            />
            <SkeletonBlock
              x={0}
              y={320}
              width="100%"
              height={230}
              radius={22}
              opacity={0.12}
            />
            <ScanningBeam startFrame={0.4 * fps} durationFrames={2.2 * fps} />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 18,
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <TaggedIcon variant="search" tagNumber={1} delay={0.8 * fps} />
              <TaggedIcon variant="cart" tagNumber={2} delay={1 * fps} />
              <TaggedIcon variant="close" tagNumber={3} delay={1.2 * fps} />
            </div>
            <LabelPill
              text="Search"
              delay={1.6 * fps}
              style={{
                position: "absolute",
                top: 92,
                right: 128,
              }}
            />
            <GeminiCallout
              delay={1.2 * fps}
              lines={["#1 Search", "#2 Cart", "#3 Close"]}
              style={{
                position: "absolute",
                right: 24,
                bottom: 26,
              }}
            />
          </MockBrowser>
        </div>
      </div>
      <div style={{ position: "absolute", top: 90, right: 110 }}>
        <TechChipStack chips={chips} />
      </div>
    </AbsoluteFill>
  );
};
