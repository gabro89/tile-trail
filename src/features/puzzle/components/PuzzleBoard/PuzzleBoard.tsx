import { areCellsAdjacent, findEmptyIndex, getMoveDirection } from '../../utils/puzzle.utils.ts';
import { PuzzleTile } from '../PuzzleTile/PuzzleTile.tsx';
import type { PuzzleBoardProps } from './PuzzleBoard.types.ts';
import './PuzzleBoard.scss';

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
      {board.map((cell, index) => {
        const canMove = !isSolved && areCellsAdjacent(index, emptyIndex, gridSize);

        return (
          <PuzzleTile
            key={cell.kind === 'tile' ? `tile-${cell.id}` : 'empty'}
            cell={cell}
            index={index}
            gridSize={gridSize}
            image={image}
            moveDirection={canMove ? getMoveDirection(index, emptyIndex, gridSize) : null}
            isRevealed={isSolved}
            onSelect={onTileSelect}
          />
        );
      })}
    </div>
  );
}
