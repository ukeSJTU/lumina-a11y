import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Shot } from "./Shot";
import { SHOT_SPECS } from "./shotData";

export const DemoVideoMaster: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0C0F14" }}>
      {SHOT_SPECS.map((spec) => (
        <Sequence
          key={spec.id}
          from={spec.startFrame}
          durationInFrames={spec.durationInFrames}
        >
          <Shot spec={spec} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
