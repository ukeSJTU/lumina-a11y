import "./index.css";
import { Composition, Folder } from "remotion";
import { DemoVideoMaster } from "./demo-video/DemoVideoMaster";
import { Shot } from "./demo-video/Shot";
import {
  SHOT_SPECS,
  TOTAL_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./demo-video/shotData";
// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="DemoVideo">
        <Composition
          id="DemoMaster"
          component={DemoVideoMaster}
          durationInFrames={TOTAL_DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
        />
        <Folder name="Shots">
          {SHOT_SPECS.map((spec) => (
            <Composition
              key={spec.id}
              id={`DemoShot-${spec.id}`}
              component={Shot}
              durationInFrames={spec.durationInFrames}
              fps={VIDEO_FPS}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              defaultProps={{ spec }}
            />
          ))}
        </Folder>
      </Folder>
    </>
  );
};
