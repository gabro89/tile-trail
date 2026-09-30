import type { Ref } from 'react';

export interface PuzzleControlsProps {
  readonly newGameButtonRef: Ref<HTMLButtonElement>;
  readonly onNewGame: () => void;
  readonly onRestart: () => void;
}
