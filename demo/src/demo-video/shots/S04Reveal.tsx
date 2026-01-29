import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BadgePill,
  ExtensionBadge,
  LogoLockup,
} from "../components/ShotElements";

const BACKGROUND_COLOR = "#0C0F14";

type S04RevealShotProps = {
  onScreenText: string;
};

export const S04RevealShot: React.FC<S04RevealShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const [titleText, taglineText] = onScreenText
    .split(" / ")
    .map((segment) => segment.trim());

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
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: sceneOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <LogoLockup
            title={titleText || "WebIlluminator"}
            tagline={taglineText || "Illuminate the dark corners of the web."}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <ExtensionBadge delay={0.5 * fps} />
            <BadgePill text="One click." delay={0.8 * fps} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
