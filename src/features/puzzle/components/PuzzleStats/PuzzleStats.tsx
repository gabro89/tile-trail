import type { PuzzleStatsProps } from './PuzzleStats.types.ts';
import './PuzzleStats.scss';

function formatMoves(count: number): string {
  return `${count} ${count === 1 ? 'move' : 'moves'}`;
}

export function PuzzleStats({ moveCount, status }: PuzzleStatsProps) {
  return (
    <div className="puzzle-stats">
      <p className="puzzle-stats__moves">
        Moves <span className="puzzle-stats__count">{moveCount}</span>
      </p>
      {/* Always mounted so only the completion text is announced, not every move. */}
      <div role="status">
        {status === 'solved' && (
          <p className="puzzle-stats__message">
            Solved! You rebuilt the picture in {formatMoves(moveCount)}.
          </p>
        )}
      </div>
    </div>
  );
}
