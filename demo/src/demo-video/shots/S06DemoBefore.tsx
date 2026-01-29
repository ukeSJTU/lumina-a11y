import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BadgePill, HighlightRing } from "../components/ShotElements";
import { IconButton, MockBrowser, SkeletonBlock } from "../components/MockUI";

const BACKGROUND_COLOR = "#0C0F14";
type S06DemoBeforeShotProps = {
  onScreenText: string;
};

const IconHighlight: React.FC<{
  variant: "search" | "cart" | "close";
  delay: number;
}> = ({ variant, delay }) => {
  const size = 52;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <HighlightRing size={size} delay={delay} />
      <IconButton variant={variant} size={size} />
    </div>
  );
};

const MockContent: React.FC<{ showIcons: boolean }> = ({ showIcons }) => {
  const { fps } = useVideoConfig();

  return (
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
      {showIcons && (
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
          <IconHighlight variant="search" delay={0.4 * fps} />
          <IconHighlight variant="cart" delay={0.6 * fps} />
          <IconHighlight variant="close" delay={0.8 * fps} />
        </div>
      )}
    </MockBrowser>
  );
};

export const S06DemoBeforeShot: React.FC<S06DemoBeforeShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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
          position: "absolute",
          top: 60,
          left: 90,
        }}
      >
        <BadgePill text={onScreenText || "Before"} variant="muted" />
      </div>
      <div
        style={{
          display: "flex",
          gap: 26,
          padding: "120px 90px 80px",
          height: "100%",
          opacity: sceneOpacity,
        }}
      >
        <div style={{ flex: 1 }}>
          <MockContent showIcons />
        </div>
        <div style={{ flex: 1, opacity: 0.75 }}>
          <MockContent showIcons={false} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          width: 2,
          height: "70%",
          backgroundColor: "rgba(244, 246, 248, 0.12)",
          transform: "translateX(-1px)",
        }}
      />
    </AbsoluteFill>
  );
};
