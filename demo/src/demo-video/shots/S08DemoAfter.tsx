import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BadgePill,
  CaptionStack,
  LabelPill,
} from "../components/ShotElements";
import { IconButton, MockBrowser, SkeletonBlock } from "../components/MockUI";

const BACKGROUND_COLOR = "#0C0F14";

type S08DemoAfterShotProps = {
  onScreenText: string;
};

export const S08DemoAfterShot: React.FC<S08DemoAfterShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 0.7 * fps, durationInFrames - 0.2 * fps],
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
        <BadgePill text={onScreenText || "After"} variant="muted" />
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
            <div style={{ position: "relative" }}>
              <IconButton variant="search" size={52} />
              <LabelPill
                text="Search"
                style={{ position: "absolute", top: 58, left: -4 }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <IconButton variant="cart" size={52} />
              <LabelPill
                text="Cart"
                style={{ position: "absolute", top: 58, left: 4 }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <IconButton variant="close" size={52} />
              <LabelPill
                text="Close"
                style={{ position: "absolute", top: 58, left: -2 }}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 28,
              bottom: 28,
            }}
          >
            <CaptionStack
              captions={["Search", "Cart", "Close"]}
              startDelay={0.2 * fps}
            />
          </div>
        </MockBrowser>
      </div>
    </AbsoluteFill>
  );
};
