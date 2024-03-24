import { useGameState } from "./logic/useGame";

export default function Ui() {
  const fps = useGameState((state) => state.fps);
  const playerPosition = useGameState((state) => state.playerPosition);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 1000,
      }}
      id="ui"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg viewBox="0 0 100 100" width="10" height="10" fill="white">
          <circle cx="50%" cy="50%" r="30" fill="white" />
        </svg>
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          backgroundColor: "black",
          color: "yellow",
        }}
      >
        {fps.toFixed(2)} fps
        <br />
        {playerPosition.x.toFixed(2)},{playerPosition.y.toFixed(2)}
      </div>
    </div>
  );
}
