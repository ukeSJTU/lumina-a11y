import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const TEXT_COLOR = "#F4F6F8";
const ACCENT_COLOR = "#48E2C2";

export type ImpactCard = {
  keyword: string;
  subline: string;
  icon: React.ReactNode;
};

type ImpactCardRowProps = {
  cards: ImpactCard[];
};

const CARD_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 24,
  padding: "28px 32px",
  borderRadius: 26,
  border: "1px solid rgba(244, 246, 248, 0.12)",
  backgroundColor: "rgba(17, 24, 36, 0.9)",
  boxShadow: "0 24px 40px rgba(0, 0, 0, 0.35)",
};

const IconContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 18,
      border: "1px solid rgba(72, 226, 194, 0.4)",
      backgroundColor: "rgba(72, 226, 194, 0.12)",
      color: ACCENT_COLOR,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

export const ImpactCardRow: React.FC<ImpactCardRowProps> = ({ cards }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const overlapFrames = Math.round(0.5 * fps);
  const enterFrames = Math.round(0.35 * fps);
  const exitFrames = Math.round(0.35 * fps);
  const totalOverlap = overlapFrames * Math.max(cards.length - 1, 0);
  const cardSpan = Math.floor(
    (durationInFrames + totalOverlap) / Math.max(cards.length, 1),
  );

  return (
    <div
      style={{
        display: "grid",
        gap: 22,
        width: "100%",
        maxWidth: 920,
      }}
    >
      {cards.map((card, index) => {
        const startFrame = index * (cardSpan - overlapFrames);
        const localFrame = frame - startFrame;
        const translateX = interpolate(
          localFrame,
          [0, enterFrames, cardSpan - exitFrames, cardSpan],
          [140, 0, 0, -140],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const opacity = interpolate(
          localFrame,
          [0, enterFrames, cardSpan - exitFrames, cardSpan],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const scale = interpolate(
          localFrame,
          [0, enterFrames, cardSpan - exitFrames, cardSpan],
          [0.98, 1, 1, 0.98],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <div
            key={card.keyword}
            style={{
              ...CARD_STYLE,
              transform: `translateX(${translateX}px) scale(${scale})`,
              opacity,
            }}
          >
            <IconContainer>{card.icon}</IconContainer>
            <div>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 44,
                  fontWeight: 700,
                  color: TEXT_COLOR,
                  marginBottom: 6,
                }}
              >
                {card.keyword}
              </div>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 26,
                  color: "rgba(244, 246, 248, 0.78)",
                }}
              >
                {card.subline}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
