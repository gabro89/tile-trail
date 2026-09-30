import { useEffect, useRef } from 'react';
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
  const boardRef = useRef<HTMLDivElement>(null);
  const newGameButtonRef = useRef<HTMLButtonElement>(null);

  // Completing the puzzle disables every tile, which would drop keyboard focus
  // to the page. Move it to "New game" so keyboard users can continue.
  useEffect(() => {
    if (status !== 'solved') {
      return;
    }

    const active = document.activeElement;

    if (active === null || active === document.body || boardRef.current?.contains(active)) {
      newGameButtonRef.current?.focus();
    }
  }, [status]);

  return (
    <section className="puzzle-game" aria-label="Sliding puzzle">
      <div className="puzzle-game__panel">
        <PuzzlePreview image={image} />
        <PuzzleStats moveCount={moveCount} status={status} />
      </div>
      <PuzzleBoard
        ref={boardRef}
        board={board}
        gridSize={gridSize}
        image={image}
        isSolved={status === 'solved'}
        onTileSelect={moveTileAt}
      />
      <PuzzleControls newGameButtonRef={newGameButtonRef} onNewGame={newGame} onRestart={restart} />
    </section>
  );
}
