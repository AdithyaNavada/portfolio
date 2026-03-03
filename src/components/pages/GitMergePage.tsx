// filename: components/pages/GitMergePage.tsx
'use client';

import { useState } from 'react';
import { GITMERGE_DATA } from '../../constants/gitmerge';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';
import type { GitMergeGameProps } from '../../types/gitmerge.types';

export default function GitMergePage({ isMobile }: GitMergeGameProps) {
  const [selectedConflict, setSelectedConflict] = useState<number | null>(null);
  const [resolvedConflicts, setResolvedConflicts] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleConflictResolution = (conflictId: number, choice: 'current' | 'incoming' | 'both') => {
    const conflict = GITMERGE_DATA.conflicts.find(c => c.id === conflictId);
    if (!conflict) return;

    let points = 0;
    let correct = false;

    if (conflict.difficulty === 'easy') points = 10;
    else if (conflict.difficulty === 'medium') points = 20;
    else if (conflict.difficulty === 'hard') points = 30;

    switch (choice) {
      case 'current':
        correct = conflict.correctChoice === 'current';
        break;
      case 'incoming':
        correct = conflict.correctChoice === 'incoming';
        break;
      case 'both':
        correct = conflict.correctChoice === 'both';
        points = points / 2;
        break;
    }

    if (correct) {
      setScore(prev => prev + points);
      setResolvedConflicts(prev => [...prev, conflictId]);
      setSelectedConflict(null);
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setSelectedConflict(null);
    }

    if (resolvedConflicts.length + 1 === GITMERGE_DATA.conflicts.length) {
      setGameOver(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          title="Git Merge Conflict Resolution"
          subtitle="Interactive game to practice resolving merge conflicts"
          icon="🔀"
          color="purple"
        />

        {/* Game Stats */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Score</h3>
              <p className="text-2xl font-bold text-emerald-400">{score}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Progress</h3>
              <p className="text-sm text-slate-400">
                {resolvedConflicts.length} / {GITMERGE_DATA.conflicts.length} conflicts resolved
              </p>
            </div>
          </div>
        </div>

        {/* Game Board */}
        {!gameOver ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
            <div className="space-y-4">
              {GITMERGE_DATA.conflicts.map((conflict) => {
                const isResolved = resolvedConflicts.includes(conflict.id);
                const isSelected = selectedConflict === conflict.id;

                return (
                  <div
                    key={conflict.id}
                    className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-102 ${
                      isResolved
                        ? 'border-green-500/50 bg-green-500/10 opacity-60'
                        : isSelected
                        ? 'border-amber-500/50 bg-amber-500/10 scale-105'
                        : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                    }`}
                    onClick={() => !isResolved && setSelectedConflict(conflict.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-100 mb-2">
                          Conflict #{conflict.id}: {conflict.file}
                        </h4>
                        <p className="text-sm text-slate-400 mb-3">
                          Difficulty: <span className={`font-semibold ${getDifficultyColor(conflict.difficulty)}`}>
                            {conflict.difficulty.toUpperCase()}
                          </span>
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isResolved ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {isResolved ? '✅ Resolved' : '🔄 Pending'}
                      </div>
                    </div>

                    {/* File Content */}
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <h5 className="text-sm font-semibold text-slate-300 mb-2">Current Branch:</h5>
                      <pre className="text-xs text-slate-400 whitespace-pre-wrap break-all">
                        {conflict.current}
                      </pre>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <h5 className="text-sm font-semibold text-slate-300 mb-2">Incoming Branch:</h5>
                      <pre className="text-xs text-slate-400 whitespace-pre-wrap break-all">
                        {conflict.incoming}
                      </pre>
                    </div>

                    {/* Resolution Options */}
                    {isSelected && (
                      <div className="space-y-3">
                        <h5 className="text-sm font-semibold text-slate-100 mb-3">Choose Resolution:</h5>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleConflictResolution(conflict.id, 'current')}
                            className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                              conflict.correctChoice === 'current'
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-600/50 border-slate-600/50'
                            }`}
                          >
                            <div className="text-left">
                              <div className="font-medium">Keep Current</div>
                              {conflict.correctChoice === 'current' && (
                                <div className="text-xs text-green-400 mt-1">✓ Correct</div>
                              )}
                            </div>
                          </button>
                          <button
                            onClick={() => handleConflictResolution(conflict.id, 'incoming')}
                            className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                              conflict.correctChoice === 'incoming'
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-600/50 border-slate-600/50'
                            }`}
                          >
                            <div className="text-left">
                              <div className="font-medium">Take Incoming</div>
                              {conflict.correctChoice === 'incoming' && (
                                <div className="text-xs text-green-400 mt-1">✓ Correct</div>
                              )}
                            </div>
                          </button>
                          <button
                            onClick={() => handleConflictResolution(conflict.id, 'both')}
                            className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                              conflict.correctChoice === 'both'
                                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-600/50 border-slate-600/50'
                            }`}
                          >
                            <div className="text-left">
                              <div className="font-medium">Merge Both</div>
                              {conflict.correctChoice === 'both' && (
                                <div className="text-xs text-green-400 mt-1">✓ Correct</div>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {isSelected && (
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                        <p className="text-sm text-blue-300">
                          <strong>Hint:</strong> {conflict.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <GradientCard className="text-center p-8">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Game Complete!</h2>
              <p className="text-lg text-slate-400 mb-6">
                All conflicts resolved! Final score: <span className="text-2xl font-bold text-emerald-400">{score}</span>
              </p>
              <button
                onClick={() => {
                  setScore(0);
                  setResolvedConflicts([]);
                  setGameOver(false);
                  setSelectedConflict(null);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all border border-blue-400/30"
              >
                Play Again
              </button>
            </div>
          </GradientCard>
        )}
      </div>
    </div>
  );
}
