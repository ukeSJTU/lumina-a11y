import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BadgePill, FlowDiagram } from "../components/ShotElements";

const BACKGROUND_COLOR = "#0C0F14";
const TEXT_COLOR = "#F4F6F8";

const FALLBACK_CHIPS = ["BYOK", "No backend", "No data stored"];

type S09PrivacyShotProps = {
  onScreenText: string;
};

export const S09PrivacyShot: React.FC<S09PrivacyShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const chips = onScreenText
    .split(" / ")
    .map((segment) => segment.trim())
    .filter(Boolean);
  const resolvedChips = chips.length ? chips : FALLBACK_CHIPS;

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
          top: 70,
          left: 90,
          display: "flex",
          gap: 12,
        }}
      >
        {resolvedChips.map((chip, index) => (
          <BadgePill key={chip} text={chip} delay={0.2 * fps * index} />
        ))}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
          opacity: sceneOpacity,
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 44,
              fontWeight: 700,
              color: TEXT_COLOR,
              marginBottom: 32,
            }}
          >
            Privacy, by design
          </div>
          <FlowDiagram nodes={["Browser", "Gemini", "Labels", "DOM"]} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
