import type {
  Board,
  Cell,
  CellIndex,
  GridPosition,
  ImageOffset,
  MoveDirection,
  RandomSource,
  TileId,
} from '../models/puzzle.types.ts';

const EMPTY_CELL: Cell = { kind: 'empty' };

function createSolvedBoard(gridSize: number): Board {
  const cellCount = gridSize * gridSize;

  return Array.from({ length: cellCount }, (_, index): Cell =>
    index === cellCount - 1 ? EMPTY_CELL : { kind: 'tile', id: index + 1 },
  );
}

export function getGridPosition(index: CellIndex, gridSize: number): GridPosition {
  return { row: Math.floor(index / gridSize), col: index % gridSize };
}

export function getSolvedIndex(tileId: TileId): CellIndex {
  return tileId - 1;
}

export function findEmptyIndex(board: Board): CellIndex {
  const index = board.findIndex((cell) => cell.kind === 'empty');

  if (index === -1) {
    throw new Error('Invalid board: no empty cell.');
  }

  return index;
}

/**
 * True when two cells share an edge. Comparing rows and columns (rather than
 * index differences) rules out diagonal moves and wrapping across row ends.
 */
export function areCellsAdjacent(a: CellIndex, b: CellIndex, gridSize: number): boolean {
  const first = getGridPosition(a, gridSize);
  const second = getGridPosition(b, gridSize);

  return Math.abs(first.row - second.row) + Math.abs(first.col - second.col) === 1;
}

function getNeighborIndices(index: CellIndex, gridSize: number): ReadonlyArray<CellIndex> {
  const { row, col } = getGridPosition(index, gridSize);
  const neighbors: CellIndex[] = [];

  if (row > 0) neighbors.push(index - gridSize);
  if (row < gridSize - 1) neighbors.push(index + gridSize);
  if (col > 0) neighbors.push(index - 1);
  if (col < gridSize - 1) neighbors.push(index + 1);

  return neighbors;
}

export function moveTile(board: Board, index: CellIndex, gridSize: number): Board | null {
  const tile = board[index];
  const emptyIndex = findEmptyIndex(board);

  if (tile?.kind !== 'tile' || !areCellsAdjacent(index, emptyIndex, gridSize)) {
    return null;
  }

  return board.map((cell, cellIndex) => {
    if (cellIndex === index) return EMPTY_CELL;
    if (cellIndex === emptyIndex) return tile;
    return cell;
  });
}

export function getMoveDirection(from: CellIndex, to: CellIndex, gridSize: number): MoveDirection {
  const start = getGridPosition(from, gridSize);
  const end = getGridPosition(to, gridSize);

  if (end.row < start.row) return 'up';
  if (end.row > start.row) return 'down';
  return end.col < start.col ? 'left' : 'right';
}

/** Pair with a background size of `gridSize * 100%` in both directions. */
export function getImageOffset(solvedIndex: CellIndex, gridSize: number): ImageOffset {
  const { row, col } = getGridPosition(solvedIndex, gridSize);
  const lastLine = gridSize - 1;

  return {
    x: lastLine === 0 ? 0 : (col / lastLine) * 100,
    y: lastLine === 0 ? 0 : (row / lastLine) * 100,
  };
}

export function isSolved(board: Board): boolean {
  const lastIndex = board.length - 1;

  return board.every((cell, index) =>
    index === lastIndex
      ? cell.kind === 'empty'
      : cell.kind === 'tile' && getSolvedIndex(cell.id) === index,
  );
}

function pickRandom<T>(items: ReadonlyArray<T>, random: RandomSource): T {
  const item = items[Math.floor(random() * items.length)];

  if (item === undefined) {
    throw new Error('Cannot pick from an empty list.');
  }

  return item;
}

/**
 * Walks the empty cell through random legal moves from the solved board, so the
 * result is always solvable. The distribution is not uniform over solvable boards.
 */
export function createShuffledBoard(
  gridSize: number,
  moveCount: number,
  random: RandomSource = Math.random,
): Board {
  let board = createSolvedBoard(gridSize);
  let emptyIndex = findEmptyIndex(board);
  let previousEmptyIndex: CellIndex | null = null;
  let movesMade = 0;

  while (movesMade < moveCount || isSolved(board)) {
    const neighbors = getNeighborIndices(emptyIndex, gridSize);
    const forward = neighbors.filter((neighbor) => neighbor !== previousEmptyIndex);
    const tileIndex = pickRandom(forward.length > 0 ? forward : neighbors, random);
    const nextBoard = moveTile(board, tileIndex, gridSize);

    if (!nextBoard) {
      throw new Error('Shuffle produced an illegal move.');
    }

    board = nextBoard;
    previousEmptyIndex = emptyIndex;
    emptyIndex = tileIndex;
    movesMade += 1;
  }

  return board;
}
