import type { GameStatus } from '../../models/puzzle.types.ts';
import './PuzzleStats.scss';

interface PuzzleStatsProps {
  readonly moveCount: number;
  readonly status: GameStatus;
}

function formatMoves(count: number): string {
  return `${count} ${count === 1 ? 'move' : 'moves'}`;
}

export function PuzzleStats({ moveCount, status }: PuzzleStatsProps) {
  return (
    <div className="puzzle-stats">
      <p className="puzzle-stats__moves">
        Moves <span className="puzzle-stats__count">{moveCount}</span>
      </p>
      {/* The live region stays mounted so screen readers announce only the completion text. */}
      <p className="puzzle-stats__message" role="status">
        {status === 'solved' ? `Solved! You rebuilt the picture in ${formatMoves(moveCount)}.` : ''}
      </p>
    </div>
  );
}
