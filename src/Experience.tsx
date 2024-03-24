import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import {
  KeyboardControls,
  PerformanceMonitor,
  PointerLockControls,
  Torus,
} from "@react-three/drei";
import { keyboardMap } from "./lib/keyboard";
import Player from "./components/Player";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  Pixelation,
} from "@react-three/postprocessing";
import Level from "./Level";
import Ui from "./Ui";
import { useGameState } from "./logic/useGame";

export default function App() {
  return (
    <>
      <Ui />
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") {
            (e.target as HTMLCanvasElement).requestPointerLock();
          }
        }}
      >
        <FpsTracker />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.04} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Pixelation granularity={6} />
        </EffectComposer>
        <fog attach="fog" args={["#000", 0, 25]} />

        <KeyboardControls map={keyboardMap}>
          <Suspense>
            <Physics>
              <Level />
              <Player />
            </Physics>
          </Suspense>
        </KeyboardControls>
      </Canvas>
    </>
  );
}

function FpsTracker() {
  const setFps = useGameState((state) => state.setFps);

  return (
    <PerformanceMonitor
      onChange={(fps) => {
        setFps(fps.fps);
      }}
    />
  );
}
