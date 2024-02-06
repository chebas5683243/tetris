import Settings from "@/config/settings";
import { Piece } from "./piece";

interface Cell {
  isEmpty: boolean;
  color?: string;
}

type Row = Cell[];
export type Board = Row[];

function initializeBoard(): Board {
  return Array.from(Array(Settings.HEIGHT)).map(
    () =>
      Array.from(Array(Settings.WIDTH)).map(() => ({
        isEmpty: true,
      })) as Row,
  );
}

function checkIfCollisionExists(
  coordinates: Piece["coordinates"],
  board: Board,
) {
  let collision = false;

  for (let i = 0; i < coordinates.length; i++) {
    const coord = coordinates[i];

    const xValid = coord.x < Settings.WIDTH && coord.x >= 0;
    const yValid = coord.y >= 0;

    if (!xValid || !yValid) {
      collision = true;
      break;
    }

    const boardCell = board[coord.y]?.[coord.x];

    if (!boardCell || !boardCell.isEmpty) {
      collision = true;
      break;
    }
  }

  return collision;
}

function mergePieceToBoard(piece: Piece, board: Board) {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  for (let i = 0; i < piece.projectionCoords.length; i++) {
    const coord = piece.projectionCoords[i];
    newBoard[coord.y][coord.x] = {
      isEmpty: false,
      color: piece.color,
    };
  }

  return deleteFullRows(newBoard);
}

function deleteFullRows(board: Board) {
  const newBoard: Board = [];
  let linesCleared = 0;

  for (let y = Settings.HEIGHT - 1; y >= 0; y--) {
    const row = board[y];
    let rowCompleted = true;

    for (let x = 0; x < Settings.WIDTH; x++) {
      const cell = row[x];
      if (cell.isEmpty) {
        rowCompleted = false;
        break;
      }
    }

    if (rowCompleted) linesCleared++;
    else newBoard.unshift(row);
  }

  for (let i = 0; i < linesCleared; i++) {
    newBoard.unshift(
      Array.from(Array(Settings.WIDTH)).map(() => ({ isEmpty: true })),
    );
  }

  return { newBoard, linesCleared };
}

const BoardHelper = {
  initializeBoard,
  checkIfCollisionExists,
  mergePieceToBoard,
};

export default BoardHelper;
