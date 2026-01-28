import React from "react";
import { ShotScaffold } from "./ShotScaffold";
import type { ShotSpec } from "./shotData";

type ShotProps = {
  spec: ShotSpec;
};

export const Shot: React.FC<ShotProps> = ({ spec }) => {
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
