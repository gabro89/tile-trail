import { PuzzleGame } from '../features/puzzle/components/PuzzleGame/PuzzleGame.tsx';
import './App.scss';

export function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">TileTrail</h1>
        <p className="app__intro">
          Slide the tiles into the empty space to rebuild the picture. Only tiles next to the empty
          space can move.
        </p>
      </header>
      <PuzzleGame />
    </main>
  );
}
