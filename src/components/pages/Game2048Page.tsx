// filename: components/pages/Game2048Page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useGame2048 } from '../../hooks/useGame2048';
import { GAME_2048_CONFIG } from '../../constants/game2048';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';
import type { Game2048Props } from '../../types/game2048.types';

export default function Game2048Page({ isMobile }: Game2048Props) {
  const {
    board,
    score,
    bestScore,
    gameOver,
    won,
    moveCount,
    move,
    resetGame,
    getTileColor
  } = useGame2048(isMobile);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right'
        };
        move(directionMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    const threshold = GAME_2048_CONFIG.thresholds.touchThreshold;

    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        move(deltaX > 0 ? 'right' : 'left');
      } else {
        move(deltaY > 0 ? 'down' : 'up');
      }
    }
    setTouchStart(null);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-1">2048</h1>
              <p className="text-slate-400 text-sm">Join tiles to reach 2048!</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600/50">
                <div className="text-slate-400 text-xs uppercase">Score</div>
                <div className="text-slate-100 text-xl font-bold">{score}</div>
              </div>
              <div className="bg-amber-500/20 px-4 py-2 rounded-lg border border-amber-500/30">
                <div className="text-amber-400 text-xs uppercase">Best</div>
                <div className="text-amber-300 text-xl font-bold">{bestScore}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-400 text-sm">Moves: {moveCount}</div>
              <button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                New Game
              </button>
            </div>
          </div>

          <div 
            className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600/50 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {(gameOver || won) && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">{won ? '🎉' : '😢'}</div>
                  <h2 className="text-3xl font-bold text-slate-100 mb-2">
                    {won ? 'You Win!' : 'Game Over'}
                  </h2>
                  <p className="text-slate-300 mb-2">
                    {score} points scored in {moveCount} moves.
                  </p>
                  {!won && <p className="text-slate-400 text-sm mb-4">No powerups used!</p>}
                  <button
                    onClick={resetGame}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3">
              {board.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`aspect-square rounded-lg flex items-center justify-center font-bold text-2xl transition-all duration-150 ${getTileColor(cell)} ${
                      cell !== 0 ? 'shadow-lg' : ''
                    }`}
                  >
                    {cell !== 0 && cell}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
            <div className="text-slate-300 text-sm text-center mb-3">Touch Controls</div>
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <button
                onClick={() => move('up')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => move('left')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => move('down')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                ↓
              </button>
              <button
                onClick={() => move('right')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                →
              </button>
            </div>
          </div>
        )}

        <GradientCard className="mt-6 bg-slate-800/50 p-4 rounded-2xl border border-slate-600/50">
          <div className="text-slate-300 text-sm">
            <div className="font-semibold mb-2">How to Play:</div>
            <ul className="space-y-1 text-slate-400">
              <li>• Use arrow keys {isMobile && 'or swipe'} to move tiles</li>
              <li>• Tiles with same numbers merge when they touch</li>
              <li>• Reach 2048 to win!</li>
            </ul>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
