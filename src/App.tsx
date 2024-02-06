import { Game } from "./components/Game";
import { useGameStore } from "./store/game";

function App() {
  const startGame = useGameStore((store) => store.start);
  const board = useGameStore((store) => store.board);

  return (
    <div className="flex justify-center items-center bg-gray-700 p-4 w-full h-full">
      {!board && <button onClick={startGame}>Empezar juego</button>}
      {!!board && <Game />}
    </div>
  );
}

export default App;
