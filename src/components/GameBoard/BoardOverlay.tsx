import { useGameStore } from "@/store/game";
import { useShallow } from "zustand/react/shallow";

export function BoardOverlay() {
  const { isGameOver, start, lines } = useGameStore(
    useShallow((state) => ({
      isGameOver: state.isGameOver,
      lines: state.lines,
      start: state.start,
    })),
  );

  if (isGameOver === false) return null;

  return (
    <div className="absolute left-0 top-0 flex flex-col gap-4 items-center justify-center w-full h-full bg-black bg-opacity-80">
      <span className="text-center text-6xl text-gray-200">
        {isGameOver ? "You lost!" : "Just another tetris game"}
      </span>
      <span className="text-gray-200 text-lg">
        {isGameOver ? `Score: ${lines}` : "Press to start"}
      </span>
      <button
        className="bg-gray-600 text-gray-200 text-lg py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
        onClick={start}
      >
        {isGameOver ? "Play Again" : "Play"}
      </button>
    </div>
  );
}
