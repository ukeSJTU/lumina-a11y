import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BenefitCardRow,
  type BenefitCard,
} from "../components/ShotElements";

const BACKGROUND_COLOR = "#0C0F14";

const BoltIcon: React.FC = () => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 3 L6 19 H15 L13 29 L26 13 H17 Z" />
  </svg>
);

const CodeIcon: React.FC = () => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8 L6 16 L12 24" />
    <path d="M20 8 L26 16 L20 24" />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 25 C10 20 6 17 6 12 C6 8 9 5 13 5 C15 5 17 6 18 8 C19 6 21 5 23 5 C27 5 30 8 30 12 C30 17 26 20 16 25 Z" />
  </svg>
);

type S10BenefitsShotProps = {
  onScreenText: string;
};

export const S10BenefitsShot: React.FC<S10BenefitsShotProps> = ({
  onScreenText,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const labels = onScreenText
    .split(" / ")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const cards: BenefitCard[] = [
    {
      title: labels[0] || "Instant repair",
      icon: <BoltIcon />,
    },
    {
      title: labels[1] || "Developer-friendly",
      icon: <CodeIcon />,
    },
    {
      title: labels[2] || "User-first",
      icon: <HeartIcon />,
    },
  ];

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
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
          opacity: sceneOpacity,
        }}
      >
        <BenefitCardRow cards={cards} />
      </div>
    </AbsoluteFill>
  );
};
