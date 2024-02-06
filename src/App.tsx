import { Board } from "./components/Game";
import { useGameStore } from "./store/game";

function App() {
  const lines = useGameStore((state) => state.lines);

  return (
    <div className="flex justify-center items-center bg-gray-700 p-4 w-full h-full">
      <div>
        <p>Score: </p>
        <p>{lines}</p>
      </div>
      <Board />
    </div>
  );
}

export default App;
