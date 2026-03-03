// src/hooks/useGameOfLife.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_OF_LIFE_CONFIG } from '../constants/gameoflife';
import type { GridDimensions, GameCell } from '../types/gameoflife.types';

export const useGameOfLife = (isMobile: boolean = false) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(GAME_OF_LIFE_CONFIG.defaults.speed);
  const [cellSize, setCellSize] = useState(isMobile ? GAME_OF_LIFE_CONFIG.defaults.cellSize.mobile : GAME_OF_LIFE_CONFIG.defaults.cellSize.desktop);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);

  const getGridDimensions = useCallback((): GridDimensions => {
    const dimensions = isMobile ? GAME_OF_LIFE_CONFIG.defaults.gridDimensions.mobile : GAME_OF_LIFE_CONFIG.defaults.gridDimensions.desktop;
    const rows = Math.floor(dimensions.height / cellSize);
    const cols = Math.floor(dimensions.width / cellSize);
    return { rows, cols };
  }, [isMobile, cellSize]);

  const createEmptyGrid = useCallback(() => {
    const { rows, cols } = getGridDimensions();
    return Array(rows).fill(null).map(() => Array(cols).fill(false));
  }, [getGridDimensions]);

  const countNeighbors = useCallback((grid: boolean[][], x: number, y: number): number => {
    let count = 0;
    const gridRows = grid.length;
    const gridCols = grid[0]?.length || 0;
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < gridRows && newY >= 0 && newY < gridCols) {
          if (grid[newX][newY]) count++;
        }
      }
    }
    return count;
  }, []);

  const runSimulation = useCallback(() => {
    setGrid((currentGrid) => {
      if (!currentGrid || currentGrid.length === 0) return currentGrid;
      
      const newGrid = currentGrid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(currentGrid, i, j);
          if (cell) {
            return neighbors >= 2 && neighbors <= 3;
          } else {
            return neighbors === 3;
          }
        })
      );
      
      const pop = newGrid.reduce((sum, row) => 
        sum + row.filter(cell => cell).length, 0
      );
      setPopulation(pop);
      
      return newGrid;
    });
    setGeneration((g) => g + 1);
  }, [countNeighbors]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const { rows, cols } = getGridDimensions();
    const x = Math.floor((e.clientY - rect.top) / cellSize);
    const y = Math.floor((e.clientX - rect.left) / cellSize);

    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      const newGrid = grid.map((row, i) =>
        row.map((cell, j) => (i === x && j === y ? !cell : cell))
      );
      setGrid(newGrid);
      
      const pop = newGrid.reduce((sum, row) => 
        sum + row.filter(cell => cell).length, 0
      );
      setPopulation(pop);
    }
  }, [grid, cellSize, getGridDimensions]);

  const addPattern = useCallback((pattern: number[][]) => {
    if (!grid || grid.length === 0) return;
    
    const newGrid = grid.map(row => [...row]);
    const { rows, cols } = getGridDimensions();
    const startRow = Math.floor(rows / 2);
    const startCol = Math.floor(cols / 2);
    
    pattern.forEach(([i, j]) => {
      if (startRow + i < rows && startCol + j < cols) {
        newGrid[startRow + i][startCol + j] = true;
      }
    });
    
    setGrid(newGrid);
    setGeneration(0);
    
    const pop = newGrid.reduce((sum, row) => 
      sum + row.filter(cell => cell).length, 0
    );
    setPopulation(pop);
  }, [grid, getGridDimensions]);

  const clear = useCallback(() => {
    setGrid(createEmptyGrid());
    setGeneration(0);
    setPopulation(0);
    setIsRunning(false);
  }, [createEmptyGrid]);

  return {
    canvasRef,
    isRunning,
    speed,
    cellSize,
    grid,
    generation,
    population,
    getGridDimensions,
    handleCanvasClick,
    runSimulation,
    addPattern,
    clear,
    setIsRunning,
    setSpeed,
    setCellSize
  };
};
