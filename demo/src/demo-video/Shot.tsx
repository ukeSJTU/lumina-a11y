import React from "react";
import { ShotScaffold } from "./ShotScaffold";
import type { ShotSpec } from "./shotData";
import { S01HookShot } from "./shots/S01Hook";
import { S02ProblemShot } from "./shots/S02Problem";
import { S03ImpactShot } from "./shots/S03Impact";
import { S04RevealShot } from "./shots/S04Reveal";
import { S05HowItWorksShot } from "./shots/S05HowItWorks";
import { S06DemoBeforeShot } from "./shots/S06DemoBefore";
import { S07DemoActionShot } from "./shots/S07DemoAction";
import { S08DemoAfterShot } from "./shots/S08DemoAfter";
import { S09PrivacyShot } from "./shots/S09Privacy";
import { S10BenefitsShot } from "./shots/S10Benefits";
import { S11CloseShot } from "./shots/S11Close";

type ShotProps = {
  spec: ShotSpec;
};

export const Shot: React.FC<ShotProps> = ({ spec }) => {
  if (spec.id === "S01") {
    const captionMatch = spec.audioNotes.match(/'([^']+)'/);
    const captionText = captionMatch
      ? captionMatch[1]
      : spec.audioNotes.replace(/^screen reader:\s*/i, "");

    return (
      <S01HookShot
        onScreenText={spec.onScreenText}
        captionText={captionText}
      />
    );
  }

  if (spec.id === "S02") {
    return <S02ProblemShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S03") {
    return <S03ImpactShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S04") {
    return <S04RevealShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S05") {
    return <S05HowItWorksShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S06") {
    return <S06DemoBeforeShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S07") {
    return <S07DemoActionShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S08") {
    return <S08DemoAfterShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S09") {
    return <S09PrivacyShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S10") {
    return <S10BenefitsShot onScreenText={spec.onScreenText} />;
  }

  if (spec.id === "S11") {
    return <S11CloseShot onScreenText={spec.onScreenText} />;
  }

  return (
    <ShotScaffold
      id={spec.id}
      title={spec.title}
      narration={spec.narration}
      onScreenText={spec.onScreenText}
      visuals={spec.visuals}
      audioNotes={spec.audioNotes}
      notes={spec.notes}
    />
  );
};
