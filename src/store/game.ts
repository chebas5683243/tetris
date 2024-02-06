import BoardHelper, { Board } from "@/helpers/board";
import PieceHelper, { Move, Piece } from "@/helpers/piece";
import { create } from "zustand";

interface GameState {
  board: Board;
  piece: Piece;
  points: number;
  level: number;
  lines: number;
}

interface GameStore extends Partial<GameState> {
  start: () => void;
  movePiece: (move: Move) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  start: () => {
    const board = BoardHelper.initializeBoard();
    const piece = PieceHelper.generateNewPiece(board);

    set({
      board,
      piece,
      points: 0,
      level: 0,
      lines: 0,
    });
  },
  movePiece: (move: Move) => {
    set((state) => {
      const { piece, board } = state;

      if (!piece || !board) return state;

      const { board: newBoard, piece: newPiece } = PieceHelper.movePiece(
        piece,
        move,
        board,
      );

      return {
        board: newBoard,
        piece: newPiece,
      };
    });
  },
}));
