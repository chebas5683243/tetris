import { useGameStore } from "@/store/game";
import { useShallow } from "zustand/react/shallow";

export function PlayButton() {
  const { isGameOver, start, lines } = useGameStore(
    useShallow((state) => ({
      isGameOver: state.isGameOver,
      lines: state.lines,
      start: state.start,
    })),
  );

  if (isGameOver === false) return null;

  return (
    <div className="flex flex-col items-center gap-3 p-4 w-3/5 bg-gray-800 border-2 border-gray-400 rounded-lg text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="text-xl font-extrabold">
        {isGameOver ? "You lost!" : "Hey"}
      </span>
      <span>{isGameOver ? `Score: ${lines}` : "Press to start"}</span>
      <button
        className="bg-gray-600 text-gray-400 py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
        onClick={start}
      >
        {isGameOver ? "Play Again" : "Play"}
      </button>
    </div>
  );
}
