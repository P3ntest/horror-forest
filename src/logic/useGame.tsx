import { create } from "zustand";

type BasicObstacleInfo = {
  x: number;
  y: number;
  rotation: number;
};

export type TileData = {
  trees: BasicObstacleInfo[];
  smallRocks: BasicObstacleInfo[];
};

export type TileType = {
  x: number;
  y: number;
  data: TileData;
};

interface GameState {
  fps: number;
  setFps: (fps: number) => void;
  playerPosition: { x: number; y: number };
  setPlayerPosition: (position: { x: number; y: number }) => void;

  tiles: {
    [key: number]: {
      [key: number]: TileData;
    };
  };
  setTile: (x: number, y: number, data: TileData) => void;
}

export const useGameState = create<GameState>((set) => ({
  fps: 0,
  setFps: (fps) => set({ fps }),
  playerPosition: { x: 0, y: 0 },
  setPlayerPosition: (position) => set({ playerPosition: position }),

  tiles: {},
  setTile: (x, y, data) =>
    set((state) => {
      const tiles = { ...state.tiles };
      if (!tiles[x]) {
        tiles[x] = {};
      }
      tiles[x][y] = data;
      return { tiles };
    }),
}));
