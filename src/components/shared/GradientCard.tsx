// src/components/shared/GradientCard.tsx
import React from 'react';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 transition-all duration-300 ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
