import type { PuzzlePreviewProps } from './PuzzlePreview.types.ts';
import './PuzzlePreview.scss';

export function PuzzlePreview({ image }: PuzzlePreviewProps) {
  return (
    <figure className="puzzle-preview">
      <img className="puzzle-preview__image" src={image.src} alt={image.alt} />
      <figcaption className="puzzle-preview__caption">Goal</figcaption>
    </figure>
  );
}
