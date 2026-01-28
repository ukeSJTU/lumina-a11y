import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BACKGROUND_COLOR = "#0C0F14";
const TEXT_COLOR = "#F4F6F8";
const ACCENT_COLOR = "#48E2C2";
const GHOST_BORDER = "rgba(244, 246, 248, 0.25)";
const GHOST_FILL = "rgba(244, 246, 248, 0.08)";

const WAVE_HEIGHT = 140;
const WAVE_POINTS = 80;

const buildWavePath = (
  width: number,
  height: number,
  frame: number,
  fps: number,
) => {
  const phase = (frame / fps) * Math.PI * 2 * 0.4;
  const amplitude = 18 + Math.sin((frame / fps) * Math.PI * 2 * 0.12) * 6;
  const centerY = height / 2;
  const frequency = Math.PI * 4;

  const points: string[] = [];
  for (let i = 0; i <= WAVE_POINTS; i += 1) {
    const progress = i / WAVE_POINTS;
    const x = progress * width;
    const y =
      centerY + Math.sin(progress * frequency + phase) * amplitude * 0.9;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `M ${points.join(" L ")}`;
};

type S01HookShotProps = {
  onScreenText: string;
  captionText: string;
};

const Waveform: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const path = useMemo(
    () => buildWavePath(width, WAVE_HEIGHT, frame, fps),
    [frame, fps, width],
  );

  return (
    <svg
      width={width}
      height={WAVE_HEIGHT}
      viewBox={`0 0 ${width} ${WAVE_HEIGHT}`}
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        opacity,
      }}
    >
      <path
        d={path}
        fill="none"
        stroke={ACCENT_COLOR}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d={path}
        fill="none"
        stroke={ACCENT_COLOR}
        strokeWidth={10}
        strokeLinecap="round"
        opacity={0.15}
      />
    </svg>
  );
};

const GhostIconCloud: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const icons = [
    { x: 0.2, y: 0.3, size: 90 },
    { x: 0.34, y: 0.52, size: 70 },
    { x: 0.52, y: 0.28, size: 80 },
    { x: 0.68, y: 0.52, size: 74 },
    { x: 0.82, y: 0.34, size: 64 },
  ];

  return (
    <>
      {icons.map((icon, index) => {
        const float =
          Math.sin((frame / fps) * Math.PI * 2 * 0.08 + index) * 12;
        const scale =
          0.92 + Math.sin((frame / fps) * Math.PI * 2 * 0.05 + index) * 0.04;

        return (
          <div
            key={`${icon.x}-${icon.y}`}
            style={{
              position: "absolute",
              left: `${icon.x * 100}%`,
              top: `${icon.y * 100}%`,
              width: icon.size,
              height: icon.size,
              borderRadius: 18,
              border: `1px solid ${GHOST_BORDER}`,
              backgroundColor: GHOST_FILL,
              boxShadow: `0 0 30px rgba(72, 226, 194, 0.08)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: opacity * (0.22 + index * 0.03),
              transform: `translate(-50%, -50%) translateY(${float}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                width: icon.size * 0.32,
                height: icon.size * 0.32,
                borderRadius: icon.size * 0.16,
                border: `1px solid ${GHOST_BORDER}`,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export const S01HookShot: React.FC<S01HookShotProps> = ({
  onScreenText,
  captionText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 1.2 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 1.2 * fps, durationInFrames - 0.2 * fps],
    [1, 0],
    {
      extrapolateRight: "clamp",
    },
  );
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  const titleOpacity = Math.min(
    interpolate(frame, [0.4 * fps, 1.6 * fps], [0, 1], {
      extrapolateRight: "clamp",
    }),
    interpolate(
      frame,
      [durationInFrames - 1.3 * fps, durationInFrames - 0.3 * fps],
      [1, 0],
      {
        extrapolateRight: "clamp",
      },
    ),
  );

  const captionIn = interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  const captionOut = interpolate(
    frame,
    [durationInFrames - 1.2 * fps, durationInFrames - 0.2 * fps],
    [1, 0],
    {
      extrapolateRight: "clamp",
    },
  );
  const captionOpacity = Math.min(captionIn, captionOut);
  const captionTranslate = interpolate(frame, [1 * fps, 2 * fps], [12, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND_COLOR }}>
      <AbsoluteFill style={{ opacity: sceneOpacity }}>
        <GhostIconCloud opacity={sceneOpacity} />
        <Waveform opacity={sceneOpacity} />
        <div
          style={{
            position: "absolute",
            top: 140,
            width: "100%",
            textAlign: "center",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 700,
            color: TEXT_COLOR,
            opacity: titleOpacity,
            padding: "0 120px",
          }}
        >
          {onScreenText}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 110,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            transform: `translateY(${captionTranslate}px)`,
            opacity: captionOpacity,
          }}
        >
          <div
            style={{
              padding: "16px 34px",
              borderRadius: 999,
              border: "1px solid rgba(72, 226, 194, 0.35)",
              backgroundColor: "rgba(12, 15, 20, 0.8)",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 30,
              fontWeight: 600,
              color: TEXT_COLOR,
              letterSpacing: 0.3,
            }}
          >
            {captionText}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
