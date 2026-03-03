import React, { useState } from 'react';
import { EDUCATION_DATA } from '../../constants/education';
import { getColorClasses } from '../../utils/color-map';
import { GradientCard } from '../shared/GradientCard';
import { SectionHeader } from '../shared/SectionHeader';
import type { EducationPageProps } from '../../types/education.types';

export const EducationPage = ({ openContactWindow }: EducationPageProps) => {
  const [activeSection, setActiveSection] = useState('timeline');
  const [hoveredEducation, setHoveredEducation] = useState<string | null>(null);

  const sections = {
    timeline: { name: 'Academic Timeline', icon: '📚', color: 'green' },
    specialized: { name: 'Specialized Learning', icon: '🚀', color: 'purple' }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <div className="relative text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education & Learning Journey
            </h1>
            <p className="text-lg text-slate-400">Academic excellence and continuous learning in technology</p>
            <div className="flex justify-center mt-4 space-x-2">
              <span className="text-2xl animate-bounce">🎓</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🚀</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💡</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === key
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 text-slate-100 shadow-lg'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
                }`}
              >
                {section.icon} {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Timeline */}
        {activeSection === 'timeline' && (
          <div className="space-y-8 animate-fadeIn">
            {EDUCATION_DATA.degrees.map((edu, index) => {
              const colors = getColorClasses(edu.color);
              return (
                <div
                  key={edu.id}
                  className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-500 transform hover:scale-102 ${
                    hoveredEducation === edu.id
                      ? `${colors.border} shadow-lg scale-102`
                      : 'border-slate-700/50 hover:border-slate-600/50'
                  }`}
                  onMouseEnter={() => setHoveredEducation(edu.id)}
                  onMouseLeave={() => setHoveredEducation(null)}
                  style={{
                    animation: `slideInLeft 0.6s ease-out forwards ${index * 200}ms`
                  }}
                >
                  {/* Timeline Connector */}
                  {index < EDUCATION_DATA.degrees.length - 1 && (
                    <div className="absolute left-12 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-slate-600/50 to-transparent"></div>
                  )}

                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Icon & Status */}
                      <div className="flex flex-col items-center">
                        <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-4 rounded-full text-3xl shadow-lg`}>
                          {edu.icon}
                        </div>
                        <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                          edu.status === 'Completed' 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                          {edu.status}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h2 className="text-2xl font-bold text-slate-100">{edu.degree}</h2>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                            {edu.year}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-semibold text-slate-200 mb-2">🏫 Institution</h3>
                            <p className="text-slate-300 text-lg">{edu.institution}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-200 mb-2">📅 Duration</h3>
                            <p className="text-slate-300 text-lg">{edu.duration}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-200 mb-2">🎯 Specialization</h3>
                            <p className="text-slate-300">{edu.specialization}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="font-semibold text-slate-200 mb-3">🔍 Focus Areas</h3>
                          <p className="text-slate-400 text-lg italic">{edu.focus}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-200 mb-3">✨ Key Highlights</h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {edu.highlights.map((highlight, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg transition-all duration-300 border ${
                                  hoveredEducation === edu.id
                                    ? `bg-gradient-to-br ${colors.gradient} ${colors.text} ${colors.border}`
                                    : 'bg-slate-700/30 text-slate-300 border-slate-600/30'
                                }`}
                              >
                                <span className="font-medium">• {highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Achievement Badge */}
                  {hoveredEducation === edu.id && (
                    <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-sm font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                      {edu.status === 'Completed' ? '🔥 Active' : '🏆 Completed'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Specialized Learning */}
        {activeSection === 'specialized' && (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            {EDUCATION_DATA.specializedLearning.map((area, index) => {
              const colors = getColorClasses(area.color);
              return (
                <div
                  key={area.area}
                  className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    hoveredEducation === area.area
                      ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg`
                      : 'border-slate-700/50 hover:border-slate-600/50'
                  }`}
                  onMouseEnter={() => setHoveredEducation(area.area)}
                  onMouseLeave={() => setHoveredEducation(null)}
                  style={{
                    animation: `fadeInUp 0.5s ease-out forwards ${index * 150}ms`
                  }}
                >
                  <div className="text-center mb-4">
                    <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl`}>
                      {area.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">{area.area}</h3>
                    <p className="text-slate-400 text-sm">{area.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Summary */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mt-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">🎓 Education at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-slate-100">6+</div>
                <p className="text-sm text-slate-400">Years of Learning</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-slate-100">2</div>
                <p className="text-sm text-slate-400">Degrees Pursuing</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-slate-100">4</div>
                <p className="text-sm text-slate-400">Specialization Areas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-slate-100">8.6</div>
                <p className="text-sm text-slate-400">Average GPA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mt-6 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Continuous Learning, Continuous Growth! 📈</h2>
          <p className="text-slate-400 mb-6">
            My educational journey reflects a commitment to excellence and staying at the forefront of technology.
          </p>
          <button 
            onClick={openContactWindow}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-purple-500/20 border border-purple-400/30"
          >
            Let's Learn Together! 🚀
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
