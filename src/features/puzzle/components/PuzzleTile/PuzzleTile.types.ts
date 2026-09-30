import type { Cell, CellIndex, MoveDirection, PuzzleImage } from '../../models/puzzle.types.ts';

export interface PuzzleTileProps {
  readonly cell: Cell;
  readonly index: CellIndex;
  readonly gridSize: number;
  readonly image: PuzzleImage;
  /** Where the tile would slide, or `null` when it cannot move. */
  readonly moveDirection: MoveDirection | null;
  /** Shows the empty cell's missing picture fragment once the puzzle is solved. */
  readonly isRevealed: boolean;
  readonly onSelect: (index: CellIndex) => void;
}
