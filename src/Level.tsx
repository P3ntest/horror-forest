import { RigidBody } from "@react-three/rapier";
import Tiles from "./components/world/Tiles";

export default function Level() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 20, 10]} />

      <RigidBody>
        <mesh position={[0, -1000, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </RigidBody>

      <Tiles />

      {/* <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} /> */}
    </>
  );
}
