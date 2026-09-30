export type CellIndex = number;

export type TileId = number;

interface NumberedTile {
  readonly kind: 'tile';
  readonly id: TileId;
}

interface EmptyCell {
  readonly kind: 'empty';
}

export type Cell = NumberedTile | EmptyCell;

/** Cells in row-major order. The board is always `gridSize * gridSize` long. */
export type Board = ReadonlyArray<Cell>;

export type GameStatus = 'playing' | 'solved';

export interface GridPosition {
  readonly row: number;
  readonly col: number;
}

export type MoveDirection = 'up' | 'down' | 'left' | 'right';

/** Background offsets, in percent. */
export interface ImageOffset {
  readonly x: number;
  readonly y: number;
}

/** The picture must be square. */
export interface PuzzleImage {
  readonly src: string;
  readonly alt: string;
}

/** Returns a number in [0, 1), like `Math.random`. */
export type RandomSource = () => number;

export interface PuzzleConfig {
  readonly gridSize: number;
  readonly shuffleMoveCount: number;
  readonly image: PuzzleImage;
}
