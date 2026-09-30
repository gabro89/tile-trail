import type { Board, CellIndex, GameStatus } from '../models/puzzle.types.ts';

export interface UsePuzzleGameOptions {
  readonly gridSize: number;
  readonly shuffleMoveCount: number;
}

export interface PuzzleGameState {
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
