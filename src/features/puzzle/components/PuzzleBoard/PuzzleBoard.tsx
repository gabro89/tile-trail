import type { Ref } from 'react';
import type { Board, CellIndex, PuzzleImage } from '../../models/puzzle.types.ts';
import { areCellsAdjacent, findEmptyIndex, getMoveDirection } from '../../utils/puzzle.utils.ts';
import { PuzzleTile } from '../PuzzleTile/PuzzleTile.tsx';
import './PuzzleBoard.scss';

interface PuzzleBoardProps {
  readonly ref: Ref<HTMLDivElement>;
  readonly board: Board;
  readonly gridSize: number;
  readonly image: PuzzleImage;
  /** When solved, every tile is locked and the full picture is shown. */
  readonly isSolved: boolean;
  readonly onTileSelect: (index: CellIndex) => void;
}

export function PuzzleBoard({
  ref,
  board,
  gridSize,
  image,
  isSolved,
  onTileSelect,
}: PuzzleBoardProps) {
  const emptyIndex = findEmptyIndex(board);
  const tracks = `repeat(${gridSize}, minmax(0, 1fr))`;

  return (
    <div
      ref={ref}
      className={`puzzle-board${isSolved ? ' puzzle-board--solved' : ''}`}
      role="group"
      aria-label={`Puzzle board, ${gridSize} by ${gridSize}`}
      style={{ gridTemplateColumns: tracks, gridTemplateRows: tracks }}
    >
      {board.map((cell, index) => (
        <PuzzleTile
          key={cell.kind === 'tile' ? `tile-${cell.id}` : 'empty'}
          cell={cell}
          index={index}
          gridSize={gridSize}
          image={image}
          moveDirection={
            !isSolved && areCellsAdjacent(index, emptyIndex, gridSize)
              ? getMoveDirection(index, emptyIndex, gridSize)
              : null
          }
          isRevealed={isSolved}
          onSelect={onTileSelect}
        />
      ))}
    </div>
  );
}
