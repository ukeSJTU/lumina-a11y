import React from "react";
import { ShotScaffold } from "./ShotScaffold";
import type { ShotSpec } from "./shotData";
import { S01HookShot } from "./shots/S01Hook";

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
