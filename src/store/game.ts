import BoardHelper, { Board } from "@/helpers/board";
import PieceHelper, { Move, Piece, PieceType } from "@/helpers/piece";
import { create } from "zustand";

interface GameState {
  board: Board;
  piece: Piece;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  speed: number;
  nextShapes: PieceType[];
  savedShape?: PieceType;
}

interface GameStore extends Partial<GameState> {
  start: () => void;
  movePiece: (move: Move) => void;
  savePiece: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  start: () => {
    const board = BoardHelper.initializeBoard();
    const piece = PieceHelper.generateNewPiece(board);

    set({
      board,
      piece,
      score: 0,
      level: 1,
      lines: 0,
      isGameOver: false,
      speed: 1000,
      nextShapes: Array.from({ length: 3 }, () => PieceHelper.getRandomShape()),
      savedShape: undefined,
    });
  },

  movePiece: (move: Move) => {
    set((state) => {
      const { piece, board, lines, nextShapes } = state;

      if (
        piece === undefined ||
        board === undefined ||
        lines === undefined ||
        nextShapes === undefined
      ) {
        return state;
      }

      const postMoveState = PieceHelper.movePiece(piece, move, board);

      const { board: postMoveBoard, linesCleared } = postMoveState;

      let postMovePiece = postMoveState.piece;

      if (postMovePiece) {
        return {
          ...state,
          piece: postMovePiece,
        };
      }

      const newNextShapes = [...nextShapes];
      newNextShapes.push(PieceHelper.getRandomShape());

      postMovePiece = PieceHelper.generateNewPiece(
        postMoveBoard,
        newNextShapes.shift(),
      );

      const isGameOver = BoardHelper.checkIfCollisionExists(
        postMovePiece.coordinates,
        postMoveBoard,
      );

      const newLines = lines + linesCleared;
      const level = Math.floor(newLines / 10) + 1;
      const speed = Math.max(1000 - (level - 1) * 75, 100);

      return {
        ...state,
        board: postMoveBoard,
        piece: postMovePiece,
        nextShapes: newNextShapes,
        isGameOver,
        lines: lines + linesCleared,
        level,
        speed,
      };
    });
  },

  savePiece: () => {
    set((state) => {
      const { nextShapes, savedShape, piece, board } = state;

      if (!piece || !nextShapes || !board) return state;

      if (savedShape) {
        return {
          ...state,
          savedShape: piece.type,
          piece: PieceHelper.generateNewPiece(board, savedShape),
        };
      }

      const newNextShapes = [...nextShapes];
      newNextShapes.push(PieceHelper.getRandomShape());

      const newSavedShape = piece.type;
      const newPiece = PieceHelper.generateNewPiece(
        board,
        newNextShapes.shift(),
      );

      return {
        ...state,
        nextShapes: newNextShapes,
        savedShape: newSavedShape,
        piece: newPiece,
      };
    });
  },
}));
