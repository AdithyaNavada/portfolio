// filename: components/pages/HelpPage.tsx
'use client';

import { useState } from 'react';
import { HELP_DATA } from '../../constants/help';
import { getColorClasses } from '../../utils/color-map';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';

export default function HelpPage() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [hoveredTip, setHoveredTip] = useState<string | null>(null);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          title="Help & Documentation"
          subtitle="Interactive guide to using this portfolio desktop environment"
          icon="📚"
          color="emerald"
        />

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {HELP_DATA.apps.map((app) => {
            const colors = getColorClasses(app.color);
            return (
              <div
                key={app.id}
                className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredApp === app.id
                    ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                    : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                }`}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                {/* App Icon */}
                <div className={`flex items-center justify-center mb-4 p-4 rounded-xl ${colors.bg} ${colors.text} ${colors.border}`}>
                  <span className="text-4xl">{app.icon}</span>
                </div>

                {/* App Title */}
                <h3 className="text-xl font-bold text-slate-100 mb-2">{app.title}</h3>
                
                {/* Description */}
                <p className={`text-sm mb-4 transition-colors ${
                  hoveredApp === app.id ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  {app.description}
                </p>

                {/* Floating Badge */}
                {hoveredApp === app.id && (
                  <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                    ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">💡 Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HELP_DATA.tips.map((tip, index) => (
              <div
                key={index}
                className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredTip === tip
                    ? 'border-amber-500/50 bg-amber-500/10 shadow-lg scale-105'
                    : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                }`}
                onMouseEnter={() => setHoveredTip(tip)}
                onMouseLeave={() => setHoveredTip(null)}
              >
                <p className={`text-sm transition-colors ${
                  hoveredTip === tip ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  {tip}
                </p>

                {/* Floating Badge */}
                {hoveredTip === tip && (
                  <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                    💡
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <GradientCard className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">⌨️ Keyboard Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HELP_DATA.shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <div className="flex items-center justify-center w-20 h-12 bg-slate-600/50 rounded border border-slate-500/30">
                  <span className="text-xs font-mono text-slate-300">{shortcut.key}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-100">{shortcut.action}</p>
                </div>
              </div>
            ))}
          </div>
        </GradientCard>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
