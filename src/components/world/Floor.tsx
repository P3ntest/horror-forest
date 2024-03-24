import { useLoader } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import { TextureLoader } from "three";
import { RepeatWrapping } from "three";
import { TILE_SIZE } from "./Tile";

export default function Floor() {
  const texture = useLoader(TextureLoader, "textures/grass_02.png");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <mesh>
        <CuboidCollider
          args={[TILE_SIZE / 2, TILE_SIZE / 2, 0.5]}
          position={[0, 0, -0.5]}
        />
        <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
