import { PUZZLE_CONFIG } from '../../config/puzzle.config.ts';
import { usePuzzleGame } from '../../hooks/usePuzzleGame.ts';
import { PuzzleBoard } from '../PuzzleBoard/PuzzleBoard.tsx';
import './PuzzleGame.scss';

export function PuzzleGame() {
  const { gridSize, image } = PUZZLE_CONFIG;
  const { board, moveTileAt } = usePuzzleGame(PUZZLE_CONFIG);

  return (
    <section className="puzzle-game" aria-label="Sliding puzzle">
      <PuzzleBoard board={board} gridSize={gridSize} image={image} onTileSelect={moveTileAt} />
    </section>
  );
}
