import { useCallback, useState } from 'react';
import type { Board, CellIndex, GameStatus } from '../models/puzzle.types.ts';
import { createShuffledBoard, isSolved, moveTile } from '../utils/puzzle.utils.ts';

interface UsePuzzleGameOptions {
  readonly gridSize: number;
  readonly shuffleMoveCount: number;
}

interface PuzzleGameState {
  /**
   * The shuffled board the current game started from, used by Restart.
   * Boards are immutable values (every move creates a new array), so this
   * snapshot can never be changed by later moves.
   */
  readonly initialBoard: Board;
  readonly board: Board;
  readonly moveCount: number;
}

export interface UsePuzzleGameResult {
  readonly board: Board;
  readonly moveCount: number;
  readonly status: GameStatus;
  readonly moveTileAt: (index: CellIndex) => void;
  readonly restart: () => void;
  readonly newGame: () => void;
}

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
