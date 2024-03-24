import { TILE_SIZE } from "../components/world/Tile";

const MIN_VIEW_RADIUS_FOR_TILES = 50;
const MAX_VIEW_RADIUS_FOR_TILES = 60;

const TILE_VIEW_RANGE = Math.round(MIN_VIEW_RADIUS_FOR_TILES / TILE_SIZE);
export function calculateTilesToEnsure(playerX: number, playerY: number) {
  // generate all x,y coordinates in the square around the player in the tile grid where each tile is TILE_SIZE big
  const playerTile = {
    x: Math.floor(playerX / TILE_SIZE),
    y: Math.floor(playerY / TILE_SIZE),
  };

  const tilesToEnsure = [];

  for (
    let x = playerTile.x - TILE_VIEW_RANGE;
    x < playerTile.x + TILE_VIEW_RANGE;
    x++
  ) {
    for (
      let y = playerTile.y - TILE_VIEW_RANGE;
      y < playerTile.y + TILE_VIEW_RANGE;
      y++
    ) {
      tilesToEnsure.push({ x, y });
    }
  }

  return tilesToEnsure;
}

export function shouldTileBeDiscarded(
  playerX: number,
  playerY: number,
  tileX: number,
  tileY: number
) {
  const playerTile = {
    x: Math.floor(playerX / TILE_SIZE),
    y: Math.floor(playerY / TILE_SIZE),
  };

  // calculate cheap using manhattan distance
  const distance =
    Math.abs(playerTile.x - tileX) + Math.abs(playerTile.y - tileY);

  return distance > (MAX_VIEW_RADIUS_FOR_TILES / TILE_SIZE) * 2;
}
