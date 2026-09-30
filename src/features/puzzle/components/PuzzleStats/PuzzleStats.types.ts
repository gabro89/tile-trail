import type { GameStatus } from '../../models/puzzle.types.ts';

export interface PuzzleStatsProps {
  readonly moveCount: number;
  readonly status: GameStatus;
}
