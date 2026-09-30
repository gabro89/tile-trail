import type { CSSProperties } from 'react';
import type { Cell, CellIndex, MoveDirection, PuzzleImage } from '../../models/puzzle.types.ts';
import { getGridPosition, getImageOffset, getSolvedIndex } from '../../utils/puzzle.utils.ts';
import './PuzzleTile.scss';

interface PuzzleTileProps {
  readonly cell: Cell;
  readonly index: CellIndex;
  readonly gridSize: number;
  readonly image: PuzzleImage;
  /** Where the tile would slide, or `null` when it cannot move. */
  readonly moveDirection: MoveDirection | null;
  readonly onSelect: (index: CellIndex) => void;
}

function getPieceStyle(
  image: PuzzleImage,
  solvedIndex: CellIndex,
  gridSize: number,
): CSSProperties {
  const offset = getImageOffset(solvedIndex, gridSize);

  return {
    backgroundImage: `url("${image.src}")`,
    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
    backgroundPosition: `${offset.x}% ${offset.y}%`,
  };
}

export function PuzzleTile({
  cell,
  index,
  gridSize,
  image,
  moveDirection,
  onSelect,
}: PuzzleTileProps) {
  if (cell.kind === 'empty') {
    return <div className="puzzle-tile puzzle-tile--empty" aria-hidden="true" />;
  }

  const { row, col } = getGridPosition(index, gridSize);
  const position = `row ${row + 1}, column ${col + 1}`;
  const canMove = moveDirection !== null;
  const label = canMove
    ? `Tile ${cell.id}, ${position}. Slide ${moveDirection}`
    : `Tile ${cell.id}, ${position}`;

  return (
    <button
      type="button"
      className={`puzzle-tile${canMove ? ' puzzle-tile--movable' : ''}`}
      style={getPieceStyle(image, getSolvedIndex(cell.id), gridSize)}
      disabled={!canMove}
      aria-label={label}
      onClick={() => onSelect(index)}
    >
      <span className="puzzle-tile__number" aria-hidden="true">
        {cell.id}
      </span>
    </button>
  );
}
