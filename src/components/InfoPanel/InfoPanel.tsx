import { Instructions } from "./Instructions";
import { SavedPiece } from "./SavedPiece";
import { Score } from "./Score";

export function InfoPanel() {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <SavedPiece />
        <Score />
      </div>
      <Instructions />
    </div>
  );
}
