import BoardHelper, { Board } from "@/helpers/board";
import PieceHelper, { Move, Piece } from "@/helpers/piece";
import { create } from "zustand";

interface GameState {
  board: Board;
  piece: Piece;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  speed: number;
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
      score: 0,
      level: 1,
      lines: 0,
      isGameOver: false,
      speed: 1000,
    });
  },

  movePiece: (move: Move) => {
    set((state) => {
      const { piece, board, lines } = state;

      if (piece === undefined || board === undefined || lines === undefined)
        return state;

      const {
        board: newBoard,
        piece: newPiece,
        linesCleared,
      } = PieceHelper.movePiece(piece, move, board);

      const isGameOver = BoardHelper.checkIfCollisionExists(
        newPiece.coordinates,
        newBoard,
      );

      const newLines = lines + linesCleared;
      const level = Math.floor(newLines / 10) + 1;
      const speed = Math.max(1000 - (level - 1) * 50, 100);

      return {
        board: newBoard,
        piece: newPiece,
        isGameOver,
        lines: lines + linesCleared,
        level,
        speed,
      };
    });
  },
}));
