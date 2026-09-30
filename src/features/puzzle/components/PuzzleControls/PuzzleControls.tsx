import type { Ref } from 'react';
import './PuzzleControls.scss';

interface PuzzleControlsProps {
  readonly newGameButtonRef: Ref<HTMLButtonElement>;
  readonly onNewGame: () => void;
  readonly onRestart: () => void;
}

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
