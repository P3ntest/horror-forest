import { useEffect, useState } from "react";
import {
  calculateTilesToEnsure,
  shouldTileBeDiscarded,
} from "../../logic/tileLogic";
import { useGameState } from "../../logic/useGame";
import { TILE_SIZE, Tile } from "./Tile";

export default function Tiles() {
  const playerPosition = useGameState((state) => state.playerPosition);

  const [renderingTiles, setRenderingTiles] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);

  useEffect(() => {
    const ensuredTileCoordinates = calculateTilesToEnsure(
      playerPosition.x,
      playerPosition.y
    );

    // find the tiles that are not already in the renderingTiles
    const newTilesToAdd = ensuredTileCoordinates.filter((tile) => {
      return !renderingTiles.some(
        (renderingTile) =>
          renderingTile.x === tile.x && renderingTile.y === tile.y
      );
    });

    // now find the ones that we can remove
    const tilesToRemove = renderingTiles.filter((renderingTile) => {
      return shouldTileBeDiscarded(
        playerPosition.x,
        playerPosition.y,
        renderingTile.x,
        renderingTile.y
      );
    });

    if (newTilesToAdd.length > 0 || tilesToRemove.length > 0) {
      console.log("adding", newTilesToAdd.length, "tiles");
      console.log("removing", tilesToRemove.length, "tiles");

      setRenderingTiles(
        [...newTilesToAdd, ...renderingTiles].filter((tile) => {
          return !tilesToRemove.some(
            (tileToRemove) =>
              tileToRemove.x === tile.x && tileToRemove.y === tile.y
          );
        })
      );

      console.log(
        "total",
        renderingTiles.length + newTilesToAdd.length - tilesToRemove.length,
        "tiles",
        "(last",
        renderingTiles.length,
        ")"
      );
    }
  }, [playerPosition, renderingTiles]);

  return (
    <>
      {renderingTiles.map((tile) => {
        return (
          <group
            key={`${tile.x}-${tile.y}`}
            position={[tile.x * TILE_SIZE, 0, tile.y * TILE_SIZE]}
          >
            <Tile coords={tile} />
          </group>
        );
      })}
    </>
  );
}
