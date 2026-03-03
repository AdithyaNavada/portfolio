import React, { useState } from 'react';
import { PROJECTS } from '../../constants/projects';
import { getColorClasses } from '../../utils/color-map';
import { GradientCard } from '../shared/GradientCard';
import type { ProjectsPageProps } from '../../types/projects.types';

export const ProjectsPage = ({ openContactWindow }: ProjectsPageProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const categories = {
    all: { name: 'All Projects', icon: '🌟', color: 'slate' },
    fullstack: { name: 'Full Stack', icon: '💻', color: 'blue' },
    ai: { name: 'AI/ML', icon: '🤖', color: 'purple' }
  };

  const filteredProjects = activeFilter === 'all' 
    ? Object.entries(PROJECTS)
    : Object.entries(PROJECTS).filter(([_, project]) => project.category === activeFilter);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <div className="relative text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🚀 Featured Projects
            </h1>
            <p className="text-lg text-slate-400">Innovation through code and creativity</p>
            <div className="flex justify-center mt-4 space-x-2">
              <span className="text-2xl animate-bounce">💻</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🤖</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🛡️</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === key
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 shadow-lg border border-slate-600'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(([projectId, project], index) => {
            const colors = getColorClasses(project.color);
            return (
              <div
                key={projectId}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredProject === projectId
                    ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                    : 'border-slate-700/50 hover:border-slate-600/50'
                }`}
                onMouseEnter={() => setHoveredProject(projectId)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setExpandedProject(expandedProject === projectId ? null : projectId)}
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-4 rounded-xl`}>
                      <span className="text-3xl">{project.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 mb-1">{project.title}</h3>
                      <p className="text-sm text-slate-400">{project.subtitle}</p>
                    </div>
                  </div>
                  <div className={`text-2xl transform transition-transform ${
                    expandedProject === projectId ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-200 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Features */}
                {expandedProject === projectId && (
                  <div className="mt-4 space-y-3 animate-fadeIn">
                    <h4 className="text-sm font-semibold text-slate-200 mb-3">Key Features</h4>
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          hoveredProject === projectId
                            ? `${colors.bg} ${colors.border}`
                            : 'bg-slate-700/30 border-slate-600/30'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-xl">{feature.icon}</span>
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-slate-100 mb-1">{feature.title}</h5>
                            <p className="text-xs text-slate-400">{feature.description}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                            {feature.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Floating Badge */}
                {hoveredProject === projectId && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                    Click to explore! ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 text-center mt-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Interested in Collaboration?</h2>
          <p className="text-slate-400 mb-6">
            I'm always open to discussing new opportunities and innovative projects. Let's create something amazing together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openContactWindow}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/20 border border-blue-400/30"
            >
              Start a Conversation 💬
            </button>
            <button
              onClick={() => window.open('https://github.com/AdithyaNavada', '_blank')}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all shadow-lg border border-slate-600"
            >
              View on GitHub 🐱
            </button>
          </div>
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

        .animate-fadeIn {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
