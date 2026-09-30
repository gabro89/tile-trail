import type { CSSProperties } from 'react';
import type { CellIndex, PuzzleImage } from '../../models/puzzle.types.ts';
import { getGridPosition, getImageOffset, getSolvedIndex } from '../../utils/puzzle.utils.ts';
import type { PuzzleTileProps } from './PuzzleTile.types.ts';
import './PuzzleTile.scss';

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
  isRevealed,
  onSelect,
}: PuzzleTileProps) {
  if (cell.kind === 'empty') {
    // The empty cell always belongs at the bottom-right of the solved picture.
    const solvedIndex = gridSize * gridSize - 1;

    return isRevealed ? (
      <div
        className="puzzle-tile puzzle-tile--revealed"
        style={getPieceStyle(image, solvedIndex, gridSize)}
        aria-hidden="true"
      />
    ) : (
      <div className="puzzle-tile puzzle-tile--empty" aria-hidden="true" />
    );
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
