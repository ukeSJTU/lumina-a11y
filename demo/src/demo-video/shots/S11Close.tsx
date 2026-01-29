import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BadgePill, LogoLockup } from "../components/ShotElements";

const BACKGROUND_COLOR = "#0C0F14";
const MUTED_TEXT = "rgba(244, 246, 248, 0.7)";
const REPO_URL = "https://github.com/ukeSJTU/lumina-a11y";

type S11CloseShotProps = {
  onScreenText: string;
};

export const S11CloseShot: React.FC<S11CloseShotProps> = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 0.8 * fps, durationInFrames - 0.1 * fps],
    [1, 0],
    {
      extrapolateRight: "clamp",
    },
  );
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const fadeToBlack = interpolate(
    frame,
    [durationInFrames - 0.6 * fps, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
    },
  );

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
            gap: 24,
          }}
        >
          <LogoLockup
            title="WebIlluminator"
            tagline="Illuminate the dark corners of the web."
          />
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 26,
              color: MUTED_TEXT,
            }}
          >
            {REPO_URL}
          </div>
          <BadgePill text="Google Hackathon" variant="muted" delay={0.2 * fps} />
        </div>
      </div>
      <AbsoluteFill
        style={{
          backgroundColor: "#000",
          opacity: fadeToBlack,
        }}
      />
    </AbsoluteFill>
  );
};
