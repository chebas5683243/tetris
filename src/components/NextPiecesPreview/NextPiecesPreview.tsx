import { useGameStore } from "@/store/game";
import { PiecesDisplayer } from "../PiecesDisplayer";

export function NextPiecesPreview() {
  const nextShapes = useGameStore((state) => state.nextShapes);
  const shapes = nextShapes ? nextShapes : [];

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-gray-200 font-bold text-2xl">Next</h1>
      <div className="bg-gray-900 py-8 border rounded-md border-gray-500 min-h-[584px] opacity-80">
        <PiecesDisplayer shapes={shapes} />
      </div>
    </div>
  );
}
