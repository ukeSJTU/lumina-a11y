import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const TEXT_COLOR = "#F4F6F8";
const MUTED_TEXT = "rgba(244, 246, 248, 0.72)";
const ACCENT_COLOR = "#48E2C2";
const DARK_SURFACE = "rgba(15, 20, 29, 0.9)";

type BadgePillProps = {
  text: string;
  variant?: "accent" | "muted" | "alert";
  delay?: number;
  style?: React.CSSProperties;
};

export const BadgePill: React.FC<BadgePillProps> = ({
  text,
  variant = "accent",
  delay,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shouldAnimate = typeof delay === "number";
  const pop = shouldAnimate
    ? spring({ frame: frame - delay, fps, config: { damping: 200 } })
    : 1;
  const scale = shouldAnimate ? interpolate(pop, [0, 1], [0.85, 1]) : 1;
  const opacity = shouldAnimate ? interpolate(pop, [0, 1], [0, 1]) : 1;

  const palette = {
    accent: {
      border: "rgba(72, 226, 194, 0.6)",
      background: "rgba(72, 226, 194, 0.14)",
      color: TEXT_COLOR,
    },
    muted: {
      border: "rgba(244, 246, 248, 0.22)",
      background: "rgba(244, 246, 248, 0.06)",
      color: TEXT_COLOR,
    },
    alert: {
      border: "rgba(255, 92, 92, 0.6)",
      background: "rgba(255, 92, 92, 0.14)",
      color: TEXT_COLOR,
    },
  }[variant];

  return (
    <div
      style={{
        padding: "10px 22px",
        borderRadius: 999,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.background,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: 0.3,
        color: palette.color,
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

type LogoLockupProps = {
  title?: string;
  tagline?: string;
  align?: "center" | "left";
  titleSize?: number;
  taglineSize?: number;
};

export const LogoLockup: React.FC<LogoLockupProps> = ({
  title = "WebIlluminator",
  tagline = "Illuminate the dark corners of the web.",
  align = "center",
  titleSize = 72,
  taglineSize = 30,
}) => {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: titleSize,
          fontWeight: 700,
          color: TEXT_COLOR,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: taglineSize,
          color: MUTED_TEXT,
        }}
      >
        {tagline}
      </div>
    </div>
  );
};

type ExtensionBadgeProps = {
  size?: number;
  delay?: number;
};

export const ExtensionBadge: React.FC<ExtensionBadgeProps> = ({
  size = 80,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 180, stiffness: 220 },
  });
  const scale = interpolate(pop, [0, 1], [0.6, 1]);
  const rotate = interpolate(pop, [0, 1], [-6, 0]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: "linear-gradient(135deg, #1E2A3A, #0F141B)",
        border: "1px solid rgba(72, 226, 194, 0.4)",
        boxShadow: "0 18px 36px rgba(0, 0, 0, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: ACCENT_COLOR,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        opacity,
      }}
    >
      <svg
        width={size * 0.46}
        height={size * 0.46}
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 6 L30 18 L42 20 L33 30 L36 42 L24 35 L12 42 L15 30 L6 20 L18 18 Z" />
      </svg>
    </div>
  );
};

type StepRailProps = {
  steps: string[];
  activeIndex?: number;
};

export const StepRail: React.FC<StepRailProps> = ({
  steps,
  activeIndex = 0,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gap: 18,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {steps.map((step, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 16px",
              borderRadius: 16,
              backgroundColor: isActive
                ? "rgba(72, 226, 194, 0.15)"
                : "rgba(244, 246, 248, 0.06)",
              border: `1px solid ${
                isActive
                  ? "rgba(72, 226, 194, 0.5)"
                  : "rgba(244, 246, 248, 0.12)"
              }`,
              color: isActive ? TEXT_COLOR : MUTED_TEXT,
              fontSize: 26,
              fontWeight: isActive ? 700 : 500,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isActive
                  ? ACCENT_COLOR
                  : "rgba(244, 246, 248, 0.3)",
              }}
            />
            <div>{step}</div>
          </div>
        );
      })}
    </div>
  );
};

type TechChipStackProps = {
  chips: string[];
};

export const TechChipStack: React.FC<TechChipStackProps> = ({ chips }) => {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {chips.map((chip) => (
        <BadgePill key={chip} text={chip} variant="muted" />
      ))}
    </div>
  );
};

type ScanningBeamProps = {
  startFrame?: number;
  durationFrames?: number;
};

export const ScanningBeam: React.FC<ScanningBeamProps> = ({
  startFrame = 0,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const beamDuration = durationFrames ?? durationInFrames;
  const localFrame = Math.max(0, frame - startFrame);
  const progress = Math.min(localFrame / Math.max(beamDuration, 1), 1);
  const left = interpolate(progress, [0, 1], [-40, 110]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 0.7, 0.7, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "30%",
          left: `${left}%`,
          background:
            "linear-gradient(90deg, rgba(72, 226, 194, 0), rgba(72, 226, 194, 0.25), rgba(72, 226, 194, 0))",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
};

type SoMTagProps = {
  number: number;
  delay?: number;
  style?: React.CSSProperties;
};

export const SoMTag: React.FC<SoMTagProps> = ({
  number,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const scale = interpolate(pop, [0, 1], [0.4, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundColor: ACCENT_COLOR,
        color: "#0C0F14",
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.35)",
        ...style,
      }}
    >
      {number}
    </div>
  );
};

type GeminiCalloutProps = {
  lines: string[];
  delay?: number;
  style?: React.CSSProperties;
};

export const GeminiCallout: React.FC<GeminiCalloutProps> = ({
  lines,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 160 } });
  const scale = interpolate(pop, [0, 1], [0.85, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        padding: "18px 22px",
        borderRadius: 18,
        backgroundColor: "rgba(21, 28, 38, 0.95)",
        border: "1px solid rgba(72, 226, 194, 0.25)",
        color: TEXT_COLOR,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 22,
        display: "grid",
        gap: 8,
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      <div style={{ color: ACCENT_COLOR, fontWeight: 600 }}>
        Gemini
      </div>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
};

type LabelPillProps = {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
};

export const LabelPill: React.FC<LabelPillProps> = ({
  text,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 140, stiffness: 200 },
  });
  const scale = interpolate(pop, [0, 1], [0.6, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        backgroundColor: "rgba(72, 226, 194, 0.2)",
        border: "1px solid rgba(72, 226, 194, 0.6)",
        color: TEXT_COLOR,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: 0.2,
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

type HighlightRingProps = {
  size: number;
  delay?: number;
  color?: string;
};

export const HighlightRing: React.FC<HighlightRingProps> = ({
  size,
  delay = 0,
  color = "rgba(255, 92, 92, 0.9)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const scale = interpolate(pop, [0, 1], [0.6, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 0.9]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size + 18,
        height: size + 18,
        borderRadius: 18,
        border: `2px solid ${color}`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        boxShadow: "0 0 20px rgba(255, 92, 92, 0.4)",
      }}
    />
  );
};

type KeystrokeOverlayProps = {
  keys: string[];
  delay?: number;
};

export const KeystrokeOverlay: React.FC<KeystrokeOverlayProps> = ({
  keys,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 180 } });
  const scale = interpolate(pop, [0, 1], [0.85, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 20px",
        borderRadius: 18,
        backgroundColor: DARK_SURFACE,
        border: "1px solid rgba(244, 246, 248, 0.12)",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 22,
        color: TEXT_COLOR,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {keys.map((key) => (
        <div
          key={key}
          style={{
            padding: "6px 12px",
            borderRadius: 10,
            backgroundColor: "rgba(244, 246, 248, 0.08)",
            border: "1px solid rgba(244, 246, 248, 0.16)",
            fontWeight: 600,
          }}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

type CaptionStackProps = {
  captions: string[];
  startDelay?: number;
};

export const CaptionStack: React.FC<CaptionStackProps> = ({
  captions,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "grid",
        gap: 10,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 28,
        color: TEXT_COLOR,
      }}
    >
      {captions.map((caption, index) => {
        const delay = startDelay + index * 0.25 * fps;
        const pop = spring({
          frame: frame - delay,
          fps,
          config: { damping: 200 },
        });
        const opacity = interpolate(pop, [0, 1], [0, 1]);
        const translate = interpolate(pop, [0, 1], [12, 0]);

        return (
          <div
            key={caption}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              backgroundColor: "rgba(15, 20, 29, 0.75)",
              border: "1px solid rgba(244, 246, 248, 0.12)",
              opacity,
              transform: `translateY(${translate}px)`,
            }}
          >
            {caption}
          </div>
        );
      })}
    </div>
  );
};

type FlowDiagramProps = {
  nodes: string[];
};

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ nodes }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        width: "100%",
      }}
    >
      {nodes.map((node, index) => (
        <React.Fragment key={node}>
          <div
            style={{
              padding: "18px 26px",
              borderRadius: 18,
              backgroundColor: "rgba(15, 20, 29, 0.85)",
              border: "1px solid rgba(72, 226, 194, 0.25)",
              color: TEXT_COLOR,
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 24,
              fontWeight: 600,
              minWidth: 140,
              textAlign: "center",
            }}
          >
            {node}
          </div>
          {index < nodes.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                backgroundColor: "rgba(72, 226, 194, 0.5)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -6,
                  top: -4,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: ACCENT_COLOR,
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export type BenefitCard = {
  title: string;
  icon: React.ReactNode;
};

type BenefitCardRowProps = {
  cards: BenefitCard[];
};

export const BenefitCardRow: React.FC<BenefitCardRowProps> = ({ cards }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`,
        gap: 22,
        width: "100%",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            padding: "26px 22px",
            borderRadius: 20,
            backgroundColor: "rgba(15, 20, 29, 0.85)",
            border: "1px solid rgba(244, 246, 248, 0.1)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
            color: TEXT_COLOR,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              border: "1px solid rgba(72, 226, 194, 0.4)",
              backgroundColor: "rgba(72, 226, 194, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ACCENT_COLOR,
              marginBottom: 16,
            }}
          >
            {card.icon}
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{card.title}</div>
        </div>
      ))}
    </div>
  );
};
