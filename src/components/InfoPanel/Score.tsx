import { useGameStore } from "@/store/game";
import { useShallow } from "zustand/react/shallow";

export function Score() {
  const { lines, level } = useGameStore(
    useShallow((state) => ({
      lines: state.lines,
      level: state.level,
    })),
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <ScoreItem title="Lines" score={lines} />
      <ScoreItem title="Level" score={level} />
    </div>
  );
}

function ScoreItem({ title, score }: { title: string; score?: number }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <h1 className="text-gray-200 font-bold text-2xl">{title}</h1>
      <div className="flex justify-center flex-1 bg-gray-900 border rounded-md border-gray-500 opacity-80 h-full">
        <span className="text-gray-200 text-xl">{score}</span>
      </div>
    </div>
  );
}
