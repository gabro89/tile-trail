import './PuzzleControls.scss';

interface PuzzleControlsProps {
  readonly onNewGame: () => void;
  readonly onRestart: () => void;
}

export function PuzzleControls({ onNewGame, onRestart }: PuzzleControlsProps) {
  return (
    <div className="puzzle-controls">
      <button type="button" className="puzzle-controls__button" onClick={onNewGame}>
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
