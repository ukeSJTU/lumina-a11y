import React from "react";
import { AbsoluteFill } from "remotion";

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 20,
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: 1,
};

const VALUE_STYLE: React.CSSProperties = {
  fontSize: 32,
  lineHeight: 1.3,
  marginTop: 6,
};

type ShotScaffoldProps = {
  id: string;
  title: string;
  narration: string;
  onScreenText: string;
  visuals: string;
  audioNotes: string;
  notes: string;
};

export const ShotScaffold: React.FC<ShotScaffoldProps> = ({
  id,
  title,
  narration,
  onScreenText,
  visuals,
  audioNotes,
  notes,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0C0F14",
        color: "#F4F6F8",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 700 }}>{`${id} - ${title}`}</div>
      <div style={{ marginTop: 24, display: "grid", gap: 22 }}>
        <div>
          <div style={LABEL_STYLE}>Narration</div>
          <div style={VALUE_STYLE}>{narration}</div>
        </div>
        <div>
          <div style={LABEL_STYLE}>On-screen text</div>
          <div style={VALUE_STYLE}>{onScreenText}</div>
        </div>
        <div>
          <div style={LABEL_STYLE}>Visuals</div>
          <div style={VALUE_STYLE}>{visuals}</div>
        </div>
        <div>
          <div style={LABEL_STYLE}>Audio notes</div>
          <div style={VALUE_STYLE}>{audioNotes}</div>
        </div>
        <div>
          <div style={LABEL_STYLE}>Notes</div>
          <div style={VALUE_STYLE}>{notes}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
