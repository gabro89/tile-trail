import type { Ref } from 'react';
import type { Board, CellIndex, PuzzleImage } from '../../models/puzzle.types.ts';

export interface PuzzleBoardProps {
  readonly ref: Ref<HTMLDivElement>;
  readonly board: Board;
  readonly gridSize: number;
  readonly image: PuzzleImage;
  readonly isSolved: boolean;
  readonly onTileSelect: (index: CellIndex) => void;
}
