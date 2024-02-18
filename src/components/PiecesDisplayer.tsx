import PieceHelper, { PieceType } from "@/helpers/piece";
import { useMemo } from "react";
import { Block } from "./Block";

interface Props {
  shapes: PieceType[];
}

export function PiecesDisplayer({ shapes }: Props) {
  return (
    <div className="flex flex-col gap-16 items-center justify-center min-w-[168px] w-fit bg-gray-900">
      {shapes.map((shape, index) => (
        <PieceDisplay key={index} shape={shape} />
      ))}
    </div>
  );
}

function PieceDisplay({ shape }: { shape: PieceType }) {
  const coordinates = useMemo(() => PieceHelper.generateShape(shape), [shape]);
  const color = PieceHelper.getTypeColor(shape);

  const displayHeight = 4;
  let displayWidth = 5;
  let dx = 3;

  if (shape === "I") {
    displayWidth = 5;
    dx = 3;
  }
  if (shape === "J") {
    displayWidth = 4;
    dx = 3;
  }
  if (shape === "L") {
    displayWidth = 4;
    dx = 4;
  }
  if (shape === "O") {
    displayWidth = 4;
    dx = 4;
  }
  if (shape === "S" || shape === "Z" || shape === "T") {
    displayWidth = 5;
    dx = 3;
  }

  return (
    <div className="bg-gray-900 w-fit">
      {Array.from(Array(displayHeight)).map((_, y) => (
        <div className="flex" key={y}>
          {Array.from(Array(displayWidth)).map((_, x) => {
            const id = y * displayWidth + x;
            let paintCell = false;

            coordinates.forEach((coord) => {
              if (coord.x === x + dx && coord.y === y) {
                paintCell = true;
              }
            });

            const blockColor = paintCell ? color : "black";

            return <Block key={id} id={id} color={blockColor} />;
          })}
        </div>
      ))}
    </div>
  );
}
