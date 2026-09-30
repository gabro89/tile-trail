import { PuzzleGame } from '../features/puzzle/components/PuzzleGame/PuzzleGame.tsx';
import './App.scss';

export function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">TileTrail</h1>
        <p className="app__intro">
          Rebuild the picture by sliding tiles into the empty space. Tap or click a tile next to the
          gap to move it. With a keyboard, use Tab to reach a movable tile and Enter or Space to
          slide it.
        </p>
      </header>
      <PuzzleGame />
    </main>
  );
}
