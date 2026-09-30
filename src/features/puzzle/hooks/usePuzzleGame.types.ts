import type { Board, CellIndex, GameStatus } from '../models/puzzle.types.ts';

export interface UsePuzzleGameOptions {
  readonly gridSize: number;
  readonly shuffleMoveCount: number;
}

export interface PuzzleGameState {
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
