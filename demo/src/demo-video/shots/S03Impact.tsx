import React from "react";
import { AbsoluteFill } from "remotion";
import { ImpactCardRow, type ImpactCard } from "../components/ImpactCardRow";

const BACKGROUND_COLOR = "#0C0F14";

const parseKeywords = (onScreenText: string) =>
  onScreenText
    .split(" / ")
    .map((segment) => segment.replace(/\.+$/, "").trim())
    .filter(Boolean);

const FrictionIcon: React.FC = () => (
  <svg
    width={34}
    height={34}
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 5 L33 31 H3 Z" />
    <line x1="18" y1="14" x2="18" y2="21" />
    <circle cx="18" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

const LostTimeIcon: React.FC = () => (
  <svg
    width={34}
    height={34}
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="18" r="12" />
    <line x1="18" y1="18" x2="18" y2="10.5" />
    <line x1="18" y1="18" x2="24" y2="20.5" />
  </svg>
);

const ExclusionIcon: React.FC = () => (
  <svg
    width={34}
    height={34}
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="18" r="12" />
    <line x1="11" y1="11" x2="25" y2="25" />
  </svg>
);

type S03ImpactShotProps = {
  onScreenText: string;
};

export const S03ImpactShot: React.FC<S03ImpactShotProps> = ({
  onScreenText,
}) => {
  const keywords = parseKeywords(onScreenText);
  const fallbackKeywords = ["Friction", "Lost time", "Exclusion"];
  const resolvedKeywords = fallbackKeywords.map(
    (fallback, index) => keywords[index] || fallback,
  );

  const cards: ImpactCard[] = [
    {
      keyword: resolvedKeywords[0],
      subline: "Basic actions feel hard.",
      icon: <FrictionIcon />,
    },
    {
      keyword: resolvedKeywords[1],
      subline: "Seconds turn into minutes.",
      icon: <LostTimeIcon />,
    },
    {
      keyword: resolvedKeywords[2],
      subline: "Some users cannot proceed.",
      icon: <ExclusionIcon />,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKGROUND_COLOR,
        color: "#F4F6F8",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "0 160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImpactCardRow cards={cards} />
    </AbsoluteFill>
  );
};
