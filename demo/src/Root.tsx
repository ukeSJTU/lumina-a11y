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
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

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
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
