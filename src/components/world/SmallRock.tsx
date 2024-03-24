import { useState } from "react";
import SmallRockModel from "../../assets/SmallRockModel";

export default function SmallRock() {
  const [mouseOver, setMouseOver] = useState(false);

  const SCALE = 0.05;
  return (
    <>
      <SmallRockModel
        position={[0, -2, 0]}
        scale={[SCALE, SCALE, SCALE]}
        outlined={mouseOver}
        onPointerEnter={() => setMouseOver(true)}
        onPointerLeave={() => setMouseOver(false)}
      />
      {/* <CuboidCollider args={[0.1, 0.1, 0.1]} position={[0, -1.95, 0]} /> */}
    </>
  );
}
