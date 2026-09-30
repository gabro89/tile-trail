import { PUZZLE_CONFIG } from '../../config/puzzle.config.ts';
import { usePuzzleGame } from '../../hooks/usePuzzleGame.ts';
import { PuzzleBoard } from '../PuzzleBoard/PuzzleBoard.tsx';
import { PuzzleControls } from '../PuzzleControls/PuzzleControls.tsx';
import { PuzzlePreview } from '../PuzzlePreview/PuzzlePreview.tsx';
import { PuzzleStats } from '../PuzzleStats/PuzzleStats.tsx';
import './PuzzleGame.scss';

export function PuzzleGame() {
  const { gridSize, image } = PUZZLE_CONFIG;
  const { board, moveCount, status, moveTileAt, restart, newGame } = usePuzzleGame(PUZZLE_CONFIG);

  return (
    <section className="puzzle-game" aria-label="Sliding puzzle">
      <div className="puzzle-game__panel">
        <PuzzlePreview image={image} />
        <PuzzleStats moveCount={moveCount} status={status} />
      </div>
      <PuzzleBoard
        board={board}
        gridSize={gridSize}
        image={image}
        isSolved={status === 'solved'}
        onTileSelect={moveTileAt}
      />
      <PuzzleControls onNewGame={newGame} onRestart={restart} />
    </section>
  );
}
