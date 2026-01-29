import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  GeminiCallout,
  KeystrokeOverlay,
  LabelPill,
  ScanningBeam,
  SoMTag,
} from "../components/ShotElements";
import { IconButton, MockBrowser, SkeletonBlock } from "../components/MockUI";

const BACKGROUND_COLOR = "#0C0F14";

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

type S07DemoActionShotProps = {
  onScreenText: string;
};

export const S07DemoActionShot: React.FC<S07DemoActionShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const keys = onScreenText
    .split("+")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const fadeIn = interpolate(frame, [0, 0.6 * fps], [0, 1], {
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
          position: "absolute",
          top: 70,
          left: 90,
          zIndex: 2,
        }}
      >
        <KeystrokeOverlay keys={keys.length ? keys : ["Alt", "R"]} delay={0.2 * fps} />
      </div>
      <div
        style={{
          padding: "120px 90px 80px",
          height: "100%",
          opacity: sceneOpacity,
        }}
      >
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
            width="82%"
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
          <ScanningBeam startFrame={0.6 * fps} durationFrames={2.2 * fps} />
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
            <TaggedIcon variant="search" tagNumber={1} delay={1 * fps} />
            <TaggedIcon variant="cart" tagNumber={2} delay={1.2 * fps} />
            <TaggedIcon variant="close" tagNumber={3} delay={1.4 * fps} />
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
            delay={1.4 * fps}
            lines={["#1 Search", "#2 Cart", "#3 Close"]}
            style={{
              position: "absolute",
              right: 24,
              bottom: 26,
            }}
          />
        </MockBrowser>
      </div>
    </AbsoluteFill>
  );
};
