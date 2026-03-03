// filename: components/pages/GameOfLifePage.tsx
'use client';

import { useEffect } from 'react';
import { useGameOfLife } from '../../hooks/useGameOfLife';
import { GAME_OF_LIFE_CONFIG } from '../../constants/gameoflife';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';
import type { GameOfLifePageProps } from '../../types/gameoflife.types';

export default function GameOfLifePage({ isMobile = false }: GameOfLifePageProps) {
  const {
    canvasRef,
    isRunning,
    speed,
    cellSize,
    grid,
    generation,
    population,
    handleCanvasClick,
    runSimulation,
    addPattern,
    clear,
    setIsRunning,
    setSpeed,
    setCellSize
  } = useGameOfLife(isMobile);

  useEffect(() => {
    if (!isRunning) {
      runSimulation();
    }
  }, [isRunning, runSimulation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = GAME_OF_LIFE_CONFIG.colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, GAME_OF_LIFE_CONFIG.colors.alive);
    gradient.addColorStop(1, GAME_OF_LIFE_CONFIG.colors.dead);

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          ctx.fillStyle = gradient;
          ctx.shadowColor = GAME_OF_LIFE_CONFIG.colors.alive;
          ctx.shadowBlur = 8;
          ctx.fillRect(j * cellSize + 1, i * cellSize + 1, cellSize - 2, cellSize - 2);
          ctx.shadowBlur = 0;
        }
      });
    });

    ctx.strokeStyle = GAME_OF_LIFE_CONFIG.colors.grid;
    ctx.lineWidth = 0.5;
    const { rows, cols } = { rows: grid.length, cols: grid[0]?.length || 0 };
    
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(cols * cellSize, i * cellSize);
      ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * cellSize, 0);
      ctx.lineTo(j * cellSize, rows * cellSize);
      ctx.stroke();
    }
  }, [grid, cellSize]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <SectionHeader
        title="Conway's Game of Life"
        subtitle="Interactive Cellular Automaton"
        icon="🧬"
        color="emerald"
      />

      {/* Stats */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              
              Conway's Game of Life
            </h2>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Gen:</span>
              <span className="ml-2 text-emerald-400 font-mono font-bold">{generation}</span>
            </div>
            <div className="bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Pop:</span>
              <span className="ml-2 text-blue-400 font-mono font-bold">{population}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 bg-slate-950/50">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={grid[0]?.length * cellSize || 0}
            height={grid.length * cellSize || 0}
            onClick={handleCanvasClick}
            className="border-2 border-slate-700 cursor-crosshair rounded-lg shadow-2xl shadow-emerald-500/10"
            style={{ imageRendering: 'pixelated' }}
          />
          {!isRunning && population === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Click cells to draw or use patterns below</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-800 p-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg ${
              isRunning
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-red-500/30'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-500/30'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-800 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 disabled:shadow-none"
          >
            ⏭ Step
          </button>
          <button
            onClick={() => addPattern(GAME_OF_LIFE_CONFIG.patterns.glider)}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-purple-500/30"
          >
            🚀 Glider
          </button>
          <button
            onClick={clear}
            className="px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Patterns */}
        <GradientCard className="rounded-lg p-3 border border-slate-700/50">
          <div className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wide">Patterns</div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => addPattern(GAME_OF_LIFE_CONFIG.patterns.glider)}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg text-sm transition-all duration-200 border border-slate-600/50"
            >
              🚀 Glider
            </button>
            <button
              onClick={() => addPattern(GAME_OF_LIFE_CONFIG.patterns.pulsar)}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg text-sm transition-all duration-200 border border-slate-600/50"
            >
              ⭕ Pulsar
            </button>
            <button
              onClick={() => addPattern(GAME_OF_LIFE_CONFIG.patterns.blinker)}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg text-sm transition-all duration-200 border border-slate-600/50"
            >
              💫 Blinker
            </button>
          </div>
        </GradientCard>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300 text-sm font-semibold">Speed</label>
              <span className="text-emerald-400 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded">{speed}ms</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value) as any)}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300 text-sm font-semibold">Cell Size</label>
              <span className="text-blue-400 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded">{cellSize}px</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={cellSize}
              onChange={(e) => setCellSize(Number(e.target.value) as any)}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-slate-500 text-xs pt-2 border-t border-slate-800">
          <p>Click cells to toggle • Birth: 3 neighbors • Survive: 2-3 neighbors</p>
        </div>
      </div>
    </div>
  );
}
