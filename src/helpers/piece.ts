import Settings from "@/config/settings";
import { getRandomItem } from "@/utils";
import BoardHelper, { Board } from "./board";

const PIECE_TYPES = ["O", "T", "I", "S", "Z", "J", "L"] as const;
const Colors = ["red", "green", "blue", "yellow"];

interface Coordinate {
  x: number;
  y: number;
}

export interface Piece {
  type: (typeof PIECE_TYPES)[number];
  color: string;
  center: Coordinate;
  coordinates: Coordinate[];
  projectionCoords: Coordinate[];
}

export type Move = "right" | "left" | "softDrop" | "hardDrop" | "rotate";

function generateNewPiece(board: Board): Piece {
  const type = getRandomItem(PIECE_TYPES);
  const coordinates = generateShape(type);
  const projectionCoords = getProjectionCoords(coordinates, board);

  return {
    type,
    color: getRandomItem(Colors),
    center: getCenter(type),
    coordinates,
    projectionCoords,
  };
}

function getCenter(type: Piece["type"]): Coordinate {
  const xCenter = Math.floor(Settings.WIDTH / 2);

  if (type === "I" || type === "J" || type === "T" || type === "L") {
    return { x: xCenter, y: 1 };
  }

  return { x: xCenter, y: 0 };
}

function generateShape(type: Piece["type"]) {
  const xCenter = Math.floor(Settings.WIDTH / 2);

  if (type === "I") {
    return [
      { x: xCenter, y: 0 },
      { x: xCenter, y: 1 },
      { x: xCenter, y: 2 },
      { x: xCenter, y: 3 },
    ];
  }

  if (type === "J") {
    return [
      { x: xCenter, y: 0 },
      { x: xCenter, y: 1 },
      { x: xCenter, y: 2 },
      { x: xCenter - 1, y: 2 },
    ];
  }

  if (type === "L") {
    return [
      { x: xCenter, y: 0 },
      { x: xCenter, y: 1 },
      { x: xCenter, y: 2 },
      { x: xCenter + 1, y: 2 },
    ];
  }

  if (type === "S") {
    return [
      { x: xCenter, y: 0 },
      { x: xCenter + 1, y: 0 },
      { x: xCenter, y: 1 },
      { x: xCenter - 1, y: 1 },
    ];
  }

  if (type === "Z") {
    return [
      { x: xCenter - 1, y: 0 },
      { x: xCenter, y: 0 },
      { x: xCenter, y: 1 },
      { x: xCenter + 1, y: 1 },
    ];
  }

  if (type === "O") {
    return [
      { x: xCenter, y: 0 },
      { x: xCenter, y: 1 },
      { x: xCenter + 1, y: 0 },
      { x: xCenter + 1, y: 1 },
    ];
  }

  if (type === "T") {
    return [
      { x: xCenter, y: 0 },
      { x: xCenter - 1, y: 1 },
      { x: xCenter, y: 1 },
      { x: xCenter + 1, y: 1 },
    ];
  }

  return [{ x: xCenter, y: 0 }];
}

function movePiece(piece: Piece, move: Move, board: Board) {
  if (move === "softDrop") return movePieceDown(piece, board);
  if (move === "hardDrop") return dropPiece(piece, board);
  if (move === "rotate") return rotatePiece(piece, board);
  else return movePieceToSides(piece, move, board);
}

function movePieceDown(piece: Piece, board: Board) {
  const { coordinates, center } = piece;

  const postMoveCoordinates: Coordinate[] = coordinates.map((coordinate) => ({
    x: coordinate.x,
    y: coordinate.y + 1,
  }));

  const collisionExists = BoardHelper.checkIfCollisionExists(
    postMoveCoordinates,
    board,
  );

  if (collisionExists) {
    const newBoard = BoardHelper.mergePieceToBoard(piece, board);
    return {
      board: newBoard,
      collision: true,
      piece: generateNewPiece(newBoard),
    };
  }

  const postMoveCenter = { x: center.x, y: center.y + 1 };

  return {
    board,
    collision: false,
    piece: {
      ...piece,
      coordinates: postMoveCoordinates,
      center: postMoveCenter,
    },
  };
}

function movePieceToSides(piece: Piece, move: "left" | "right", board: Board) {
  const { coordinates, center } = piece;
  const dx = move === "right" ? 1 : -1;

  const postMoveCoordinates: Coordinate[] = coordinates.map((coordinate) => ({
    x: coordinate.x + dx,
    y: coordinate.y,
  }));

  const collisionExists = BoardHelper.checkIfCollisionExists(
    postMoveCoordinates,
    board,
  );

  const postMoveCenter = collisionExists
    ? center
    : { x: center.x + dx, y: center.y };

  const postRotationProjection = collisionExists
    ? piece.projectionCoords
    : getProjectionCoords(postMoveCoordinates, board);

  return {
    board,
    collision: false,
    piece: {
      ...piece,
      coordinates: collisionExists ? coordinates : postMoveCoordinates,
      center: postMoveCenter,
      projectionCoords: postRotationProjection,
    },
  };
}

function dropPiece(piece: Piece, board: Board) {
  const newBoard = BoardHelper.mergePieceToBoard(piece, board);

  return {
    board: newBoard,
    collision: true,
    piece: generateNewPiece(newBoard),
  };
}

function rotatePiece(piece: Piece, board: Board) {
  if (piece.type === "O") return { board, collision: false, piece };

  const { coordinates, center } = piece;

  const postRotationCoordinates: Coordinate[] = coordinates.map((coord) => ({
    x: center.x - (center.y - coord.y),
    y: center.y + (center.x - coord.x),
  }));

  const collisionExists = BoardHelper.checkIfCollisionExists(
    postRotationCoordinates,
    board,
  );

  const postRotationProjection = collisionExists
    ? piece.projectionCoords
    : getProjectionCoords(postRotationCoordinates, board);

  return {
    board,
    collision: false,
    piece: {
      ...piece,
      coordinates: collisionExists ? coordinates : postRotationCoordinates,
      projectionCoords: postRotationProjection,
    },
  };
}

function getProjectionCoords(coordinates: Coordinate[], board: Board) {
  let minDistance = +Infinity;

  for (let i = 0; i < coordinates.length; i++) {
    const { x, y } = coordinates[i];
    let distance = 0;

    for (let j = y + 1; j < Settings.HEIGHT; j++) {
      const cell = board[j][x];
      if (cell.isEmpty) distance++;
      else break;
    }

    if (distance < minDistance) minDistance = distance;
  }

  return coordinates.map((coord) => ({
    x: coord.x,
    y: coord.y + minDistance,
  }));
}

const PieceHelper = {
  generateNewPiece,
  movePiece,
  rotatePiece,
};

export default PieceHelper;
