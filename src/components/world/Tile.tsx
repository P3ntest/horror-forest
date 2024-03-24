import { useEffect, useMemo } from "react";
import Floor from "./Floor";
import Tree from "./Tree";
import { useGameState } from "../../logic/useGame";
import SmallRock from "./SmallRock";

export const TILE_SIZE = 20;

function genRandomTrees() {
  const trees = [];
  const pos = () => Math.random() * TILE_SIZE - TILE_SIZE / 2;
  const treeAmount = Math.floor(Math.random() * 10 + 10);
  for (let i = 0; i < treeAmount; i++) {
    trees.push({
      x: pos(),
      y: pos(),
      rotation: Math.random() * Math.PI * 2,
    });
  }
  return trees;
}

export function Tile({
  coords,
}: {
  coords: {
    x: number;
    y: number;
  };
}) {
  const data = useGameState((state) => state.tiles[coords.x]?.[coords.y]);

  useEffect(() => {
    if (!data) {
      useGameState.getState().setTile(coords.x, coords.y, {
        trees: coords.x == 0 && coords.y == 0 ? [] : genRandomTrees(),
        smallRocks: genRandomTrees(),
      });
    }
  }, [coords, data]);

  return (
    <group>
      <Floor />
      {/* <group position={[5, 0, 5]}>
        <Tree />
      </group> */}
      {data?.trees.map((tree, index) => (
        <group
          key={index}
          position={[tree.x, 0, tree.y]}
          rotation={[0, tree.rotation, 0]}
        >
          <Tree />
        </group>
      ))}
      {data?.smallRocks.map((rock, index) => (
        <group
          key={index}
          position={[rock.x, 0, rock.y]}
          rotation={[0, rock.rotation, 0]}
        >
          <SmallRock />
        </group>
      ))}
    </group>
  );
}
