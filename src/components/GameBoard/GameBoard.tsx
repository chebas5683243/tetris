import Settings from "@/config/settings";
import { useEffect } from "react";
import { useGameStore } from "@/store/game";
import { Block } from "../Block";
import { BoardOverlay } from "./BoardOverlay";

export function GameBoard() {
  const { piece, board, speed, movePiece, isGameOver } = useGameStore();

  useEffect(() => {
    if (isGameOver) return;
    if (!speed) return;

    const intervalId = setInterval(() => movePiece("softDrop"), speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [movePiece, speed, isGameOver]);

  return (
    <div className="relative border border-gray-500 w-fit opacity-80">
      {Array.from(Array(Settings.HEIGHT)).map((_, y) => (
        <div className="flex" key={y}>
          {Array.from(Array(Settings.WIDTH)).map((_, x) => {
            const id = y * Settings.WIDTH + x;

            if (!board || !piece) return <Block key={id} id={id} />;

            let color = board[y][x].color;
            let isProjection = false;

            if (!color) {
              let outsidePiece = true;
              piece.coordinates.forEach((coord) => {
                if (coord.x === x && coord.y === y) {
                  outsidePiece = false;
                  color = piece.color;
                }
              });

              if (outsidePiece) {
                piece.projectionCoords.forEach((coord) => {
                  if (coord.x === x && coord.y === y) {
                    color = piece.color;
                    isProjection = true;
                  }
                });
              }
            }

            return (
              <Block
                key={id}
                id={id}
                color={color}
                isProjection={isProjection}
              />
            );
          })}
        </div>
      ))}
      <BoardOverlay />
    </div>
  );
}
