import Settings from "@/config/settings";
import { KeyboardEvent, useEffect } from "react";
import { Block } from "./Block";
import { useGameStore } from "@/store/game";
import { PlayButton } from "./PlayButton";

export function Board() {
  const { piece, board, speed, movePiece, lines, isGameOver } = useGameStore();

  useEffect(() => {
    if (isGameOver) return;
    if (!speed) return;

    const intervalId = setInterval(() => movePiece("softDrop"), speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [movePiece, speed, lines, isGameOver]);

  function handleMove(event: KeyboardEvent) {
    const { code } = event;

    if (code === "ArrowUp") movePiece("rotate");
    if (code === "Space") movePiece("hardDrop");
    if (code === "ArrowLeft") movePiece("left");
    if (code === "ArrowRight") movePiece("right");
    if (code === "ArrowDown") movePiece("softDrop");
  }

  return (
    <div
      className="relative border-4 border-gray-500 w-fit"
      onKeyDown={handleMove}
      tabIndex={0}
    >
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
      <PlayButton />
    </div>
  );
}
