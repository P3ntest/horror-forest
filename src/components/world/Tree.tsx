import { CuboidCollider } from "@react-three/rapier";
import TreeModel from "../../assets/TreeModel";

export default function Tree() {
  return (
    <>
      <TreeModel position={[0, -1.8, 0]} />
      <CuboidCollider args={[0.6, 10, 0.6]} position={[-0.1, 2, -0.3]} />
    </>
  );
}
