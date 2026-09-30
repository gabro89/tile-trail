import { useCallback, useState } from 'react';
import type { CellIndex } from '../models/puzzle.types.ts';
import { createShuffledBoard, isSolved, moveTile } from '../utils/puzzle.utils.ts';
import type {
  PuzzleGameState,
  UsePuzzleGameOptions,
  UsePuzzleGameResult,
} from './usePuzzleGame.types.ts';

function createGameState(gridSize: number, shuffleMoveCount: number): PuzzleGameState {
  const board = createShuffledBoard(gridSize, shuffleMoveCount);

  return { initialBoard: board, board, moveCount: 0 };
}

export function usePuzzleGame({
  gridSize,
  shuffleMoveCount,
}: UsePuzzleGameOptions): UsePuzzleGameResult {
  const [state, setState] = useState<PuzzleGameState>(() =>
    createGameState(gridSize, shuffleMoveCount),
  );

  const moveTileAt = useCallback(
    (index: CellIndex): void => {
      setState((previous) => {
        if (isSolved(previous.board)) {
          return previous;
        }

        const board = moveTile(previous.board, index, gridSize);

        return board ? { ...previous, board, moveCount: previous.moveCount + 1 } : previous;
      });
    },
    [gridSize],
  );

  const restart = useCallback((): void => {
    setState((previous) => ({ ...previous, board: previous.initialBoard, moveCount: 0 }));
  }, []);

  const newGame = useCallback((): void => {
    // Shuffle here rather than inside an updater: updaters must stay pure.
    setState(createGameState(gridSize, shuffleMoveCount));
  }, [gridSize, shuffleMoveCount]);

  return {
    board: state.board,
    moveCount: state.moveCount,
    status: isSolved(state.board) ? 'solved' : 'playing',
    moveTileAt,
    restart,
    newGame,
  };
}
