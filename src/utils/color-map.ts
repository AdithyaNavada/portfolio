// src/utils/color-map.ts
type ColorKey = 'blue' | 'green' | 'purple' | 'yellow' | 'indigo' | 'cyan' | 'orange' | 'emerald' | 'rose' | 'amber' | 'red';

export const COLOR_MAP: Record<ColorKey, {
  gradient: string;
  hover: string;
  text: string;
  bg: string;
  border: string;
}> = {
  blue: {
    gradient: 'from-blue-500/20 to-cyan-500/20',
    hover: 'hover:from-blue-500/30 hover:to-cyan-500/30',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30'
  },
  green: {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    hover: 'hover:from-emerald-500/30 hover:to-teal-500/30',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  },
  purple: {
    gradient: 'from-purple-500/20 to-pink-500/20',
    hover: 'hover:from-purple-500/30 hover:to-pink-500/30',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30'
  },
  yellow: {
    gradient: 'from-amber-500/20 to-orange-500/20',
    hover: 'hover:from-amber-500/30 hover:to-orange-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30'
  },
  indigo: {
    gradient: 'from-indigo-500/20 to-blue-500/20',
    hover: 'hover:from-indigo-500/30 hover:to-blue-500/30',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30'
  },
  cyan: {
    gradient: 'from-cyan-500/20 to-blue-500/20',
    hover: 'hover:from-cyan-500/30 hover:to-blue-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30'
  },
  orange: {
    gradient: 'from-orange-500/20 to-amber-500/20',
    hover: 'hover:from-orange-500/30 hover:to-amber-500/30',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30'
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    hover: 'hover:from-emerald-500/30 hover:to-teal-500/30',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  },
  amber: {
    gradient: 'from-amber-500/20 to-orange-500/20',
    hover: 'hover:from-amber-500/30 hover:to-orange-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30'
  },
  rose: {
    gradient: 'from-rose-500/20 to-pink-500/20',
    hover: 'hover:from-rose-500/30 hover:to-pink-500/30',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30'
  },
  red: {
    gradient: 'from-red-500/20 to-orange-500/20',
    hover: 'hover:from-red-500/30 hover:to-orange-500/30',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30'
  }
};

export const getColorClasses = (color: string) => COLOR_MAP[color as ColorKey];
