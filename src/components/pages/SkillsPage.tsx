// filename: components/pages/SkillsPage.tsx
'use client';

import { useState } from 'react';
import { SKILLS_DATA } from '../../constants/skills';
import { getColorClasses } from '../../utils/color-map';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';
import type { SkillsPageProps } from '../../types/skills.types';

export default function SkillsPage({ openContactWindow }: SkillsPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredCategories = activeCategory === 'all' 
    ? Object.entries(SKILLS_DATA)
    : Object.entries(SKILLS_DATA).filter(([key]) => key === activeCategory);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          title="Technical Skills"
          subtitle="A comprehensive showcase of my technical expertise and proficiencies"
          icon="💻"
          color="blue"
        />

        {/* Category Filter */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 shadow-lg border border-slate-600' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🌟 All Skills
            </button>
            {Object.entries(SKILLS_DATA).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === key 
                    ? `bg-gradient-to-br ${getColorClasses(category.color).gradient} text-slate-100 shadow-lg border ${getColorClasses(category.color).border}` 
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
                }`}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Display */}
        <div className="space-y-8">
          {filteredCategories.map(([key, category]) => {
            const colors = getColorClasses(category.color);
            return (
              <div key={key} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-4 rounded-full text-3xl shadow-lg`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">{category.title}</h3>
                    <p className="text-slate-400">Click skills to see details</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        hoveredSkill === skill.name
                          ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                          : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                      }`}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-slate-100 text-lg">{skill.name}</h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                          {skill.level}%
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden mb-4">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient.replace('/20', '')}`}
                          style={{ 
                            width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                            transition: 'width 1s ease-out'
                          }}
                        />
                      </div>

                      {/* Description */}
                      <p className={`text-sm mb-4 transition-colors ${
                        hoveredSkill === skill.name
                          ? 'text-slate-300'
                          : 'text-slate-400'
                      }`}>
                        {skill.description}
                      </p>

                      {/* Floating Badge */}
                      {hoveredSkill === skill.name && (
                        <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                          ✨
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <GradientCard className="text-center p-8 mt-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Collaborate?</h2>
          <p className="text-slate-400 mb-6">
            My technical skills are continuously evolving through hands-on projects and learning. 
            Let's discuss how my expertise can contribute to your next project!
          </p>
          <button 
            onClick={openContactWindow}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all border border-blue-400/30"
          >
            Let's Connect! 🤝
          </button>
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
