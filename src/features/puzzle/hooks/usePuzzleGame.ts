import { useCallback, useState } from 'react';
import type { Board, CellIndex } from '../models/puzzle.types.ts';
import { createShuffledBoard, moveTile } from '../utils/puzzle.utils.ts';

interface UsePuzzleGameOptions {
  readonly gridSize: number;
  readonly shuffleMoveCount: number;
}

export interface UsePuzzleGameResult {
  readonly board: Board;
  readonly moveTileAt: (index: CellIndex) => void;
}

export function usePuzzleGame({
  gridSize,
  shuffleMoveCount,
}: UsePuzzleGameOptions): UsePuzzleGameResult {
  const [board, setBoard] = useState<Board>(() => createShuffledBoard(gridSize, shuffleMoveCount));

  const moveTileAt = useCallback(
    (index: CellIndex): void => {
      setBoard((previous) => moveTile(previous, index, gridSize) ?? previous);
    },
    [gridSize],
  );

  return { board, moveTileAt };
}
