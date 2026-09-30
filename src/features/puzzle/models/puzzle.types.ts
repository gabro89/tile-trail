/** Zero-based index of a cell on the board, in row-major order. */
export type CellIndex = number;

/**
 * Stable identity of a picture tile, starting at 1. A tile's id never changes
 * as it moves; its solved position is `id - 1`.
 */
export type TileId = number;

/** A picture tile that carries one fragment of the image. */
export interface NumberedTile {
  readonly kind: 'tile';
  readonly id: TileId;
}

/** The single empty cell that tiles slide into. */
export interface EmptyCell {
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

/** Direction a tile slides when it moves into the empty cell. */
export type MoveDirection = 'up' | 'down' | 'left' | 'right';

/** Background offsets, in percent, that show one fragment of the picture. */
export interface ImageOffset {
  readonly x: number;
  readonly y: number;
}

/** The picture the puzzle is cut from. It must be square. */
export interface PuzzleImage {
  readonly src: string;
  readonly alt: string;
}

/** Returns a number in the range [0, 1), like `Math.random`. */
export type RandomSource = () => number;

export interface PuzzleConfig {
  /** Number of rows and columns. */
  readonly gridSize: number;
  /** Number of random legal moves used to shuffle a solved board. */
  readonly shuffleMoveCount: number;
  readonly image: PuzzleImage;
}
