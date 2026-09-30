import type { PuzzleConfig } from '../models/puzzle.types.ts';

export const PUZZLE_CONFIG: PuzzleConfig = {
  gridSize: 4,
  shuffleMoveCount: 200,
  image: {
    src: `${import.meta.env.BASE_URL}images/puzzle.svg`,
    alt: 'Illustrated landscape with a sunset sky, hot air balloon, mountains, a house, a windmill, and a lake with a sailboat',
  },
};
