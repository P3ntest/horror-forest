import { KeyboardControls, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  Noise,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Level from "./Level";
import Ui from "./Ui";
import Player from "./components/Player";
import { keyboardMap } from "./lib/keyboard";
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
