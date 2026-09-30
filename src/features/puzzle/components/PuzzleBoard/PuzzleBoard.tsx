import type { Board, CellIndex, PuzzleImage } from '../../models/puzzle.types.ts';
import { areCellsAdjacent, findEmptyIndex, getMoveDirection } from '../../utils/puzzle.utils.ts';
import { PuzzleTile } from '../PuzzleTile/PuzzleTile.tsx';
import './PuzzleBoard.scss';

interface PuzzleBoardProps {
  readonly board: Board;
  readonly gridSize: number;
  readonly image: PuzzleImage;
  readonly onTileSelect: (index: CellIndex) => void;
}

export function PuzzleBoard({ board, gridSize, image, onTileSelect }: PuzzleBoardProps) {
  const emptyIndex = findEmptyIndex(board);
  const tracks = `repeat(${gridSize}, minmax(0, 1fr))`;

  return (
    <div
      className="puzzle-board"
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
            areCellsAdjacent(index, emptyIndex, gridSize)
              ? getMoveDirection(index, emptyIndex, gridSize)
              : null
          }
          onSelect={onTileSelect}
        />
      ))}
    </div>
  );
}
