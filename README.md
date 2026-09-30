# TileTrail

TileTrail is a small browser-based sliding picture puzzle. A square picture is cut into a 4×4 grid:
15 picture tiles and one empty cell. Slide tiles into the empty cell until the picture is whole
again.

## Features

- Classic 4×4 sliding puzzle. The solved layout is row-major, with the empty cell at the
  bottom-right.
- Only tiles that share an edge with the empty cell can move. Diagonal moves and wrapping across
  rows are not allowed.
- Click or tap a movable tile to slide it. Keyboard users can Tab to a movable tile and press Enter
  or Space.
- Move counter that counts successful moves only.
- Small reference preview of the complete picture.
- **New game** creates a new shuffled board and resets the counter.
- **Restart** restores the current game's original shuffled board and resets the counter.
- When the puzzle is solved, a success message appears, tiles lock, and the missing bottom-right
  fragment is revealed so the full picture is visible.
- Mobile-first layout, visible focus styles, screen reader labels, a live region that announces
  only completion, and `prefers-reduced-motion` support.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm (uses the committed `package-lock.json`)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL that Vite prints (usually <http://localhost:5173>).

## Scripts

| Command                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                                   |
| `npm run build`        | Type-check with `tsc -b`, then create a production build in `dist/`. |
| `npm run preview`      | Serve the production build locally.                                  |
| `npm run lint`         | Run ESLint (type-aware TypeScript rules and React Hooks rules).      |
| `npm run format`       | Format all files with Prettier.                                      |
| `npm run format:check` | Check formatting without writing changes.                            |
| `npm run typecheck`    | Run the TypeScript compiler without emitting files.                  |
| `npm run knip`         | Find unused files, exports, and dependencies with Knip.              |

## Tech stack

- React 19 with functional components
- TypeScript 6.0 in strict mode, plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- Vite 8
- SCSS (Dart Sass) with shared design tokens
- ESLint flat config with `typescript-eslint`, `eslint-plugin-react-hooks`, and
  `eslint-config-prettier`
- Prettier
- Knip for unused files, exports, and dependencies

TypeScript is pinned to `~6.0.x` because `typescript-eslint` does not yet support TypeScript 7.

## Project structure

```text
tile-trail/
  public/
    favicon.svg
    images/
      puzzle.svg                 Bundled original puzzle illustration
  src/
    app/
      App.tsx                    Page shell: title, instructions, game
      App.scss
    features/
      puzzle/
        components/
          PuzzleGame/            Container: connects the game hook to the UI, manages focus
          PuzzleBoard/           Renders the grid and decides which tiles can move
          PuzzleTile/            One tile (button) or the empty cell; slices the image
          PuzzleControls/        New game and Restart buttons
          PuzzleStats/           Move counter and completion message (live region)
          PuzzlePreview/         Small preview of the complete picture
        hooks/
          usePuzzleGame.ts       Game state and actions (move, restart, new game)
          usePuzzleGame.types.ts Hook options, state, and result types
        models/
          puzzle.types.ts        Domain types (tiles, board, status, config)
        utils/
          puzzle.utils.ts        Pure puzzle logic, independent of React
        config/
          puzzle.config.ts       Grid size, shuffle length, and image source
    styles/
      _tokens.scss               Colors, spacing, radii, typography, motion
      global.scss                Base styles and reduced-motion handling
    main.tsx
```

Each component folder holds the component (`PuzzleBoard.tsx`), its props interface
(`PuzzleBoard.types.ts`), and its styles (`PuzzleBoard.scss`).

### Architecture notes

- **Where types live.** Shared domain types are in `models/puzzle.types.ts`. Types used by only one
  component or hook sit next to it in a `*.types.ts` file.
- **Pure logic.** `puzzle.utils.ts` creates solved boards, checks adjacency, applies moves
  immutably (an illegal move returns `null`), detects completion, and shuffles. It does not import
  React or the image.
- **State.** `usePuzzleGame` stores `{ initialBoard, board, moveCount }`. The game status
  (`'playing' | 'solved'`) is derived from the board instead of being stored. Boards are immutable
  arrays, so the `initialBoard` snapshot used by Restart can never be changed by later moves.
- **Tile identity.** A tile is a discriminated union: `{ kind: 'tile', id }` or `{ kind: 'empty' }`.
  The tile `id` is also its React key, so a tile keeps its DOM element (and keyboard focus) when it
  moves.
- **Image slicing.** Every tile uses the same image as a CSS background with
  `background-size: 400% 400%`. The background position comes from the tile's _solved_ position
  (`id - 1`), not its current position, so each tile always shows its own fragment.

## How solvable shuffling works

Only half of all 16! arrangements of a 15-puzzle can be solved, so the tiles are never randomly
permuted. Instead, `createShuffledBoard`:

1. Starts from the solved board.
2. Moves the empty cell into a random neighbouring cell 200 times (`shuffleMoveCount` in the config).
   Each step is a legal move, so the result can always be solved by reversing the moves.
3. Avoids undoing the previous step when another move is possible, so the walk does not waste
   moves going back and forth.
4. Keeps making moves if the board happens to be solved at the end, so a new game never starts
   solved.

This does not produce a uniform random distribution over solvable boards, and it does not
guarantee a particular difficulty.

## Replacing the bundled image

The image is configured in one place, `src/features/puzzle/config/puzzle.config.ts`:

```ts
image: {
  src: `${import.meta.env.BASE_URL}images/puzzle.svg`,
  alt: 'Illustrated landscape with …',
},
```

To use a different picture:

1. Add a **square** image (SVG, PNG, JPG, or WebP) to `public/images/`. A non-square image would
   be stretched to fit the square board.
2. Update `src` to point at the new file and give `alt` a short description of it.

Pictures with clearly different areas (colors, shapes, landmarks) make the puzzle easier to read.
Tile numbers are shown on each piece to help with ordering.

## Testing approach

Unit tests are intentionally omitted from this first version. The project is checked with:

- `npm run lint`
- `npm run format:check`
- `npm run typecheck`
- `npm run knip`
- `npm run build`
- Manual browser checks: movement rules, move counting, Restart, New game, completion reveal,
  keyboard use, and narrow mobile layouts.

The pure functions in `puzzle.utils.ts` are the natural starting point if tests are added later.

## Possible future extensions

- **Local image upload.** Let players choose their own picture with a file input and
  `URL.createObjectURL`. Tiles only use the image through the `PuzzleImage` object (`src` and
  `alt`), so the puzzle logic would not need to change. The image would move from static config
  into state, and non-square pictures would need to be cropped.
- Other grid sizes, a timer, or arrow-key navigation between tiles.
