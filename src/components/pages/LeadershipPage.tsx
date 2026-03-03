'use client';

import { useState } from 'react';
import { LEADERSHIP_DATA } from '../../constants/leadership';
import { getColorClasses } from '../../utils/color-map';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';
import type { LeadershipPageProps } from '../../types/leadership.types';

export default function LeadershipPage({ openContactWindow }: LeadershipPageProps) {
  const [activeSection, setActiveSection] = useState('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedPhilosophy, setExpandedPhilosophy] = useState(false);

  const filteredSections = activeSection === 'all'
    ? Object.entries(LEADERSHIP_DATA)
    : Object.entries(LEADERSHIP_DATA).filter(([key]) => key === activeSection);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <SectionHeader
          title="Leadership & Innovation"
          subtitle="Technical leadership, project management, and innovative solutions"
          icon="👥"
          color="blue"
        />

        {/* Section Filter */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Section</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeSection === 'all'
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 shadow-lg border border-slate-600'
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🌟 All Sections
            </button>
            {Object.entries(LEADERSHIP_DATA).filter(([key]) => key !== 'philosophy').map(([key, section]) => {
              const sectionData = section as { title: string; icon: string; color: string };
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === key
                      ? `bg-gradient-to-br ${getColorClasses(sectionData.color).gradient} text-slate-100 shadow-lg border ${getColorClasses(sectionData.color).border}`
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
                  }`}
                >
                  {sectionData.icon} {sectionData.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Leadership Content */}
        <div className="space-y-8">
          {filteredSections.map(([key, section]) => {
            const hasStandardProps = 'color' in section && 'icon' in section && 'title' in section;
            const colors = getColorClasses(hasStandardProps ? (section as any).color : 'blue');
            return (
              <div key={key} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8">

                {/* Section Header */}
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-4 rounded-full text-3xl shadow-lg`}>
                    {hasStandardProps ? (section as any).icon : '💭'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">
                      {hasStandardProps ? (section as any).title : 'Leadership Philosophy'}
                    </h3>
                    <p className="text-slate-400">Click items to see details</p>
                  </div>
                </div>

                {/* Technical Section */}
                {key === 'technical' && 'items' in section && (
                  <div className="space-y-6">
                    {(section as any).items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                        <h4 className="text-lg font-bold text-slate-100 mb-4">{item.type}</h4>
                        <div className="space-y-4">
                          {item.achievements.map((achievement: any, achIndex: number) => (
                            <div
                              key={achIndex}
                              className={`relative p-4 rounded-lg border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                                hoveredItem === `${key}-${itemIndex}-${achIndex}`
                                  ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                                  : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
                              }`}
                              onMouseEnter={() => setHoveredItem(`${key}-${itemIndex}-${achIndex}`)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h5 className="font-bold text-slate-100 text-base">{achievement.title}</h5>
                                  <p className="text-sm text-slate-400 mb-2">{achievement.event}</p>
                                  <p className="text-sm text-slate-300">{achievement.description}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} ${colors.border}`}>
                                  {achievement.level}%
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden mb-3">
                                <div
                                  className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient.replace('/20', '')}`}
                                  style={{
                                    width: hoveredItem === `${key}-${itemIndex}-${achIndex}` ? `${achievement.level}%` : '0%',
                                    transition: 'width 1s ease-out'
                                  }}
                                />
                              </div>

                              {/* Floating Badge */}
                              {hoveredItem === `${key}-${itemIndex}-${achIndex}` && (
                                <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                                  ✨
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Impact Section */}
                {key === 'impact' && 'highlights' in section && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                      {(section as any).highlights.map((highlight: any, index: number) => (
                        <div
                          key={index}
                          className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                            hoveredItem === `impact-${index}`
                              ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                              : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
                          }`}
                          onMouseEnter={() => setHoveredItem(`impact-${index}`)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 rounded-full ${colors.bg} ${colors.text} ${colors.border} flex items-center justify-center font-bold text-lg`}>
                              {highlight.metric}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-100 text-lg">{highlight.title}</h4>
                              <p className="text-sm text-slate-300 mb-2">{highlight.description}</p>
                            </div>
                          </div>

                          {/* Floating Badge */}
                          {hoveredItem === `impact-${index}` && (
                            <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                              ✨
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collaboration Section */}
                {key === 'collaboration' && 'areas' in section && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(section as any).areas.map((area: any, index: number) => (
                        <div
                          key={index}
                          className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                            hoveredItem === `collaboration-${index}`
                              ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                              : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
                          }`}
                          onMouseEnter={() => setHoveredItem(`collaboration-${index}`)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className="text-center mb-4">
                            <div className={`w-16 h-16 rounded-full ${colors.bg} ${colors.text} ${colors.border} flex items-center justify-center text-2xl mb-3`}>
                              {area.skill.slice(0, 2)}
                            </div>
                            <h4 className="font-bold text-slate-100 text-lg">{area.skill}</h4>
                            <p className="text-sm text-slate-300 mb-2">{area.context}</p>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden mb-3">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient.replace('/20', '')}`}
                              style={{
                                width: hoveredItem === `collaboration-${index}` ? `${area.strength}%` : '0%',
                                transition: 'width 1s ease-out'
                              }}
                            />
                          </div>

                          {/* Floating Badge */}
                          {hoveredItem === `collaboration-${index}` && (
                            <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                              ✨
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Philosophy Section */}
                {key === 'philosophy' && (
                  <GradientCard className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">💭</div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-4">Leadership Philosophy</h3>
                    </div>

                    <div
                      className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                        expandedPhilosophy
                          ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg`
                          : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
                      }`}
                      onClick={() => setExpandedPhilosophy(!expandedPhilosophy)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-slate-100 text-lg">Core Beliefs</h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} ${colors.border}`}>
                          {expandedPhilosophy ? '📖 Expanded' : '📝 Click to Expand'}
                        </div>
                      </div>

                      <p className={`text-slate-300 transition-all duration-300 ${
                        expandedPhilosophy ? 'text-slate-300' : 'text-slate-400 line-clamp-3'
                      }`}>
                        {LEADERSHIP_DATA.philosophy.quote}
                      </p>

                      {expandedPhilosophy && (
                        <div className="mt-4 pt-4 border-t border-slate-600/50">
                          <h5 className="text-sm font-semibold text-slate-100 mb-3">Key Principles:</h5>
                          <div className="flex flex-wrap gap-2">
                            {LEADERSHIP_DATA.philosophy.keywords.map((keyword: string, index: number) => (
                              <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </GradientCard>
                )}

              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <GradientCard className="text-center p-8 mt-6">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Lead Together?</h2>
          <p className="text-slate-400 mb-6">
            My leadership experience combines technical expertise with team collaboration and innovation.
            Let&apos;s discuss how I can contribute to your team&apos;s success!
          </p>
          <button
            onClick={openContactWindow}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all border border-blue-400/30"
          >
            Let&apos;s Collaborate! 🤝
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