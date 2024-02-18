import { useGameStore } from "@/store/game";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef } from "react";
import { NextPiecesPreview } from "./components/NextPiecesPreview/NextPiecesPreview";
import audioFile from "./assets/galaxy.mov";
import { InfoPanel } from "./components/InfoPanel/InfoPanel";

function Game() {
  const { movePiece, savePiece, isGameOver } = useGameStore(
    useShallow((state) => ({
      movePiece: state.movePiece,
      savePiece: state.savePiece,
      isGameOver: state.isGameOver,
    })),
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function handleMove(event: KeyboardEvent) {
      const { code } = event;

      if (code === "ArrowUp") movePiece("rotate");
      if (code === "Space") movePiece("hardDrop");
      if (code === "ArrowLeft") movePiece("left");
      if (code === "ArrowRight") movePiece("right");
      if (code === "ArrowDown") movePiece("softDrop");
      if (code === "KeyC") savePiece();
    }

    if (!isGameOver) window.addEventListener("keydown", handleMove);

    return () => {
      window.removeEventListener("keydown", handleMove);
    };
  }, [movePiece, savePiece, isGameOver]);

  useEffect(() => {
    if (isGameOver !== undefined) audioRef.current?.play();

    return;
  }, [isGameOver]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex gap-10">
        <InfoPanel />
        <GameBoard />
        <NextPiecesPreview />
      </div>
      <audio src={audioFile} ref={audioRef} loop />
    </div>
  );
}

export default Game;
