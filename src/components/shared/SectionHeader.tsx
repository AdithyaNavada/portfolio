// src/components/shared/SectionHeader.tsx
import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    green: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    yellow: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    indigo: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30'
  };

  return (
    <div className="flex items-center mb-6">
      <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-4 rounded-xl mr-4 text-3xl`}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        {subtitle && <p className="text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
};
