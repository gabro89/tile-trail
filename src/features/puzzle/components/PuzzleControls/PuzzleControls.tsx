import type { PuzzleControlsProps } from './PuzzleControls.types.ts';
import './PuzzleControls.scss';

export function PuzzleControls({ newGameButtonRef, onNewGame, onRestart }: PuzzleControlsProps) {
  return (
    <div className="puzzle-controls">
      <button
        ref={newGameButtonRef}
        type="button"
        className="puzzle-controls__button"
        onClick={onNewGame}
      >
        New game
      </button>
      <button
        type="button"
        className="puzzle-controls__button puzzle-controls__button--secondary"
        onClick={onRestart}
      >
        Restart
      </button>
    </div>
  );
}
