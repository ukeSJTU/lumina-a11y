import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const TEXT_COLOR = "#F4F6F8";
const ACCENT_COLOR = "#48E2C2";
const ALERT_COLOR = "#FF5C5C";

type MockBrowserProps = {
  children?: React.ReactNode;
};

export const MockBrowser: React.FC<MockBrowserProps> = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 28,
        backgroundColor: "#0F141B",
        border: "1px solid rgba(244, 246, 248, 0.08)",
        boxShadow: "0 40px 80px rgba(0, 0, 0, 0.45)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 14,
          backgroundColor: "#111824",
          borderBottom: "1px solid rgba(244, 246, 248, 0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF5C5C", "#FFBD2E", "#28C840"].map((color) => (
            <div
              key={color}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 28,
            borderRadius: 14,
            backgroundColor: "rgba(244, 246, 248, 0.08)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 32,
          background:
            "linear-gradient(180deg, rgba(14, 20, 29, 0.95), rgba(9, 12, 18, 1))",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

type SkeletonBlockProps = {
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
  radius?: number;
  opacity?: number;
};

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  x,
  y,
  width,
  height,
  radius = 12,
  opacity = 0.16,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        backgroundColor: `rgba(244, 246, 248, ${opacity})`,
      }}
    />
  );
};

type IconButtonProps = {
  variant?: "search" | "cart" | "close";
  size?: number;
};

const IconContainer: React.FC<{
  size: number;
  children: React.ReactNode;
}> = ({ size, children }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        backgroundColor: "#151C26",
        border: "1px solid rgba(244, 246, 248, 0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
      }}
    >
      {children}
    </div>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "search",
  size = 52,
}) => {
  const iconSize = size * 0.42;
  const strokeWidth = Math.max(2, Math.round(size * 0.04));

  if (variant === "search") {
    return (
      <IconContainer size={size}>
        <div
          style={{
            position: "relative",
            width: iconSize,
            height: iconSize,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: iconSize * 0.7,
              height: iconSize * 0.7,
              borderRadius: "50%",
              border: `${strokeWidth}px solid ${TEXT_COLOR}`,
              top: 0,
              left: 0,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: iconSize * 0.55,
              height: strokeWidth,
              backgroundColor: TEXT_COLOR,
              bottom: strokeWidth * 0.6,
              right: -2,
              transform: "rotate(45deg)",
              transformOrigin: "right center",
              opacity: 0.9,
            }}
          />
        </div>
      </IconContainer>
    );
  }

  if (variant === "cart") {
    return (
      <IconContainer size={size}>
        <div
          style={{
            position: "relative",
            width: iconSize * 1.1,
            height: iconSize * 0.7,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `${strokeWidth}px solid ${TEXT_COLOR}`,
              borderRadius: 6,
              opacity: 0.9,
            }}
          />
          {[0.2, 0.75].map((left) => (
            <div
              key={left}
              style={{
                position: "absolute",
                bottom: -iconSize * 0.25,
                left: `${left * 100}%`,
                width: iconSize * 0.22,
                height: iconSize * 0.22,
                borderRadius: "50%",
                border: `${strokeWidth}px solid ${TEXT_COLOR}`,
                transform: "translateX(-50%)",
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      </IconContainer>
    );
  }

  return (
    <IconContainer size={size}>
      <div
        style={{
          position: "relative",
          width: iconSize,
          height: iconSize,
        }}
      >
        {[45, -45].map((rotation) => (
          <div
            key={rotation}
            style={{
              position: "absolute",
              width: iconSize,
              height: strokeWidth,
              backgroundColor: TEXT_COLOR,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>
    </IconContainer>
  );
};

type OutlinePulseProps = {
  size: number;
  delay?: number;
  color?: string;
};

export const OutlinePulse: React.FC<OutlinePulseProps> = ({
  size,
  delay = 0,
  color = ALERT_COLOR,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const phase = (localFrame / fps) * Math.PI * 2 * 0.5;
  const wave = (Math.sin(phase) + 1) / 2;
  const scale = interpolate(wave, [0, 1], [1, 1.35]);
  const opacity = interpolate(wave, [0, 1], [0.25, 0.75]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size + 18,
        height: size + 18,
        borderRadius: 16,
        border: `2px solid ${color}`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        boxShadow: `0 0 18px rgba(255, 92, 92, 0.35)`,
      }}
    />
  );
};

type ScreenReaderStackProps = {
  lines?: number;
  text?: string;
};

export const ScreenReaderStack: React.FC<ScreenReaderStackProps> = ({
  lines = 6,
  text = "Button.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeIndex = Math.floor(frame / (fps * 0.6)) % lines;

  return (
    <div
      style={{
        display: "grid",
        gap: 14,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 32,
        letterSpacing: 0.3,
      }}
    >
      {Array.from({ length: lines }).map((_, index) => {
        const baseOpacity = 0.25 + (lines - index) * 0.08;
        const isActive = index === activeIndex;
        const drift =
          Math.sin((frame / fps) * Math.PI * 2 * 0.2 + index) * 2;

        return (
          <div
            key={`${text}-${index}`}
            style={{
              color: isActive ? ACCENT_COLOR : TEXT_COLOR,
              opacity: isActive ? 0.95 : baseOpacity,
              transform: `translateY(${drift}px)`,
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};
