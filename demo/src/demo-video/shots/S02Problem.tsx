import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  IconButton,
  MockBrowser,
  OutlinePulse,
  ScreenReaderStack,
  SkeletonBlock,
} from "../components/MockUI";

const BACKGROUND_COLOR = "#0C0F14";
const TEXT_COLOR = "#F4F6F8";

type S02ProblemShotProps = {
  onScreenText: string;
};

const PulsingIconButton: React.FC<{
  variant: "search" | "cart" | "close";
  delay: number;
}> = ({ variant, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  const scale = interpolate(pop, [0, 1], [0.9, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);
  const size = 54;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <OutlinePulse size={size} delay={delay} />
      <IconButton variant={variant} size={size} />
    </div>
  );
};

export const S02ProblemShot: React.FC<S02ProblemShotProps> = ({
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

  const [leftText, rightText] = onScreenText
    .split(" / ")
    .map((segment) => segment.trim());

  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND_COLOR }}>
      <div
        style={{
          display: "flex",
          gap: 44,
          padding: "80px 90px",
          height: "100%",
          opacity: sceneOpacity,
        }}
      >
        <div style={{ flex: 0.7, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 52,
              fontWeight: 700,
              color: TEXT_COLOR,
              marginBottom: 26,
            }}
          >
            {leftText || onScreenText}
          </div>
          <div style={{ flex: 1 }}>
            <MockBrowser>
              <SkeletonBlock
                x={0}
                y={0}
                width="100%"
                height={160}
                radius={20}
                opacity={0.14}
              />
              <SkeletonBlock
                x={0}
                y={190}
                width="68%"
                height={22}
                radius={12}
                opacity={0.12}
              />
              <SkeletonBlock
                x={0}
                y={225}
                width="84%"
                height={22}
                radius={12}
                opacity={0.1}
              />
              <SkeletonBlock
                x={0}
                y={260}
                width="56%"
                height={22}
                radius={12}
                opacity={0.1}
              />
              <SkeletonBlock
                x={0}
                y={320}
                width="100%"
                height={220}
                radius={22}
                opacity={0.12}
              />
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 16,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <PulsingIconButton variant="search" delay={0.4 * fps} />
                <PulsingIconButton variant="cart" delay={0.7 * fps} />
                <PulsingIconButton variant="close" delay={1 * fps} />
              </div>
            </MockBrowser>
          </div>
        </div>
        <div
          style={{
            flex: 0.3,
            display: "flex",
            flexDirection: "column",
            paddingTop: 14,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 34,
              fontWeight: 600,
              color: TEXT_COLOR,
              marginBottom: 24,
            }}
          >
            {rightText || "Screen readers: \"Button.\""}
          </div>
          <div
            style={{
              padding: "24px 22px",
              borderRadius: 20,
              backgroundColor: "rgba(15, 20, 29, 0.8)",
              border: "1px solid rgba(244, 246, 248, 0.08)",
            }}
          >
            <ScreenReaderStack />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
