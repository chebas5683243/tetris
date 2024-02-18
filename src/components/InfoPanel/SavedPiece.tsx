import { useGameStore } from "@/store/game";
import { PiecesDisplayer } from "../PiecesDisplayer";

export function SavedPiece() {
  const savedShape = useGameStore((state) => state.savedShape);
  const shapes = savedShape ? [savedShape] : [];

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-gray-200 font-bold text-2xl">Hold</h1>
      <div className="bg-gray-900 py-8 border rounded-md border-gray-500 min-h-[200px] opacity-80">
        <PiecesDisplayer shapes={shapes} />
      </div>
    </div>
  );
}
