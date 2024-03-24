import Ecctrl from "ecctrl";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { Vector3 } from "three";
import { useGameState } from "../logic/useGame";

export default function Player() {
  const setPlayerPosition = useGameState((state) => state.setPlayerPosition);
  const controllerRef = useRef<Group>();

  useEffect(() => {
    const interval = setInterval(() => {
      const vector = new Vector3();
      controllerRef.current?.getWorldPosition(vector);
      setPlayerPosition({
        x: vector.x,
        y: vector.z,
      });
    }, 1000 / 5);
    return () => clearInterval(interval);
  }, [setPlayerPosition]);

  return (
    // @ts-expect-error library seems broken
    <Ecctrl
      camInitDis={-0.01} // camera intial position
      camMinDis={-0.01} // camera zoom in closest position
      camFollowMult={100} // give any big number here, so the camera follows the character instantly
      turnVelMultiplier={1} // Turning speed same as moving speed
      turnSpeed={100} // give it big turning speed to prevent turning wait time
      mode="CameraBasedMovement"
      maxVelLimit={3} // max speed limit
    >
      <group ref={controllerRef} />
    </Ecctrl>
  );
}
