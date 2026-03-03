// src/hooks/useGame2048.ts
import { useState, useEffect, useCallback } from 'react';
import { GAME_2048_CONFIG } from '../constants/game2048';
import type { Board, TouchStart } from '../types/game2048.types';

export const useGame2048 = (isMobile: boolean = false) => {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const initializeBoard = useCallback((): Board => {
    const newBoard: Board = Array(GAME_2048_CONFIG.boardSize).fill(null).map(() => Array(GAME_2048_CONFIG.boardSize).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }, []);

  const addRandomTile = (currentBoard: Board) => {
    const empty: Array<[number, number]> = [];
    for (let i = 0; i < GAME_2048_CONFIG.boardSize; i++) {
      for (let j = 0; j < GAME_2048_CONFIG.boardSize; j++) {
        if (currentBoard[i][j] === 0) empty.push([i, j]);
      }
    }
    if (empty.length > 0) {
      const [row, col] = empty[Math.floor(Math.random() * empty.length)];
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const checkGameOver = (currentBoard: Board): boolean => {
    for (let i = 0; i < GAME_2048_CONFIG.boardSize; i++) {
      for (let j = 0; j < GAME_2048_CONFIG.boardSize; j++) {
        if (currentBoard[i][j] === 0) return false;
        if (j < GAME_2048_CONFIG.boardSize - 1 && currentBoard[i][j] === currentBoard[i][j + 1]) return false;
        if (i < GAME_2048_CONFIG.boardSize - 1 && currentBoard[i][j] === currentBoard[i + 1][j]) return false;
      }
    }
    return true;
  };

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;
    
    let newBoard = board.map(row => [...row]);
    let moved = false;
    let points = 0;

    const moveRow = (row: number[]): [number[], number] => {
      const filtered = row.filter(x => x !== 0);
      const merged: number[] = [];
      let rowPoints = 0;
      let i = 0;

      while (i < filtered.length) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
          const val = filtered[i] * 2;
          merged.push(val);
          rowPoints += val;
          i += 2;
        } else {
          merged.push(filtered[i]);
          i++;
        }
      }

      while (merged.length < GAME_2048_CONFIG.boardSize) merged.push(0);
      return [merged, rowPoints];
    };

    if (direction === 'left') {
      for (let i = 0; i < GAME_2048_CONFIG.boardSize; i++) {
        const [newRow, rowPoints] = moveRow(newBoard[i]);
        if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) moved = true;
        newBoard[i] = newRow;
        points += rowPoints;
      }
    } else if (direction === 'right') {
      for (let i = 0; i < GAME_2048_CONFIG.boardSize; i++) {
        const [newRow, rowPoints] = moveRow(newBoard[i].reverse());
        if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i].reverse())) moved = true;
        newBoard[i] = newRow.reverse();
        points += rowPoints;
      }
    } else if (direction === 'up') {
      for (let j = 0; j < GAME_2048_CONFIG.boardSize; j++) {
        const col = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
        const [newCol, colPoints] = moveRow(col);
        if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
        for (let i = 0; i < GAME_2048_CONFIG.boardSize; i++) newBoard[i][j] = newCol[i];
        points += colPoints;
      }
    } else if (direction === 'down') {
      for (let j = 0; j < GAME_2048_CONFIG.boardSize; j++) {
        const col = [newBoard[3][j], newBoard[2][j], newBoard[1][j], newBoard[0][j]];
        const [newCol, colPoints] = moveRow(col);
        if (JSON.stringify(newCol) !== JSON.stringify(col.reverse())) moved = true;
        for (let i = 0; i < GAME_2048_CONFIG.boardSize; i++) newBoard[i][j] = newCol[3 - i];
        points += colPoints;
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(prev => {
        const newScore = prev + points;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('2048-best', newScore.toString());
        }
        return newScore;
      });
      setMoveCount(prev => prev + 1);

      const has2048 = newBoard.some(row => row.some(cell => cell === 2048));
      if (has2048 && !won) setWon(true);
      if (checkGameOver(newBoard)) setGameOver(true);
    }
  }, [board, gameOver, won, bestScore]);

  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setMoveCount(0);
  }, [initializeBoard]);

  const getTileColor = (value: number): string => {
    return GAME_2048_CONFIG.colors[value as keyof typeof GAME_2048_CONFIG.colors] || GAME_2048_CONFIG.colors.empty;
  };

  return {
    board,
    score,
    bestScore,
    gameOver,
    won,
    moveCount,
    move,
    resetGame,
    getTileColor
  };
};
