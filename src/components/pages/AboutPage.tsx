import React, { useState } from "react";
import { PROFILE_DATA } from "../../constants/profile";
import { getColorClasses } from "../../utils/color-map";
import type { AboutPageProps } from "../../types/about.types";

export const AboutPage = ({ openContactWindow }: AboutPageProps) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const profileData = PROFILE_DATA;

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="relative rounded-2xl shadow-2xl p-8 mb-6 overflow-hidden backdrop-blur-sm border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 filter drop-shadow-lg">
              {profileData.hero.avatar}
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hello, I'm {profileData.hero.name}!
            </h1>
            <p className="text-xl mb-2 font-medium text-slate-200">
              {profileData.hero.title}
            </p>
            <p className="text-lg text-slate-400">
              {profileData.hero.subtitle}
            </p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-sm  text-slate-100 mb-4 text-center">
            Filter by Category{" "}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(profileData.sections).map(([key, section]) => {
              const colors = getColorClasses(section.color);
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === key
                      ? `bg-gradient-to-r ${colors.gradient} border ${colors.border} shadow-lg text-slate-100`
                      : `bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50`
                  }`}
                >
                  {section.icon} {section.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl mr-4 text-3xl border border-blue-500/30">
                  🚀
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">
                    Professional Journey
                  </h2>
                  <p className="text-slate-400">
                    Curious mind. Creative code. Constant growth.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <div
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredCard === "intro"
                      ? "border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 shadow-lg shadow-blue-500/10"
                      : "border-slate-700/50 bg-slate-700/20 hover:border-slate-600/50"
                  }`}
                  onMouseEnter={() => setHoveredCard("intro")}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <p className="text-slate-300 leading-relaxed">
                    {profileData.sections.overview.content.intro}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === "experience" && (
          <div className="space-y-6 animate-fadeIn">
            {profileData.sections.experience.roles.map((role) => (
              <div
                key={role.id}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-300 ${
                  hoveredCard === role.id
                    ? "border-emerald-500/50 shadow-emerald-500/10"
                    : "border-slate-700/50"
                }`}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-full text-3xl border border-emerald-500/30">
                        💼
                      </div>
                      <span
                        className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold border ${
                          role.status === "Recent"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-slate-700/50 text-slate-300 border-slate-600/50"
                        }`}
                      >
                        {role.status}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-slate-100">
                          {role.position}
                        </h2>
                        <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                          {role.period}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                          🏢 {role.company}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {role.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-200 mb-3">
                          ✨ Key Highlights
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {role.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg transition-all duration-300 border ${
                                hoveredCard === role.id
                                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                  : "bg-slate-700/30 text-slate-300 border-slate-600/30"
                              }`}
                            >
                              <span className="font-medium text-sm">
                                • {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === "achievements" && (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            {profileData.sections.achievements.awards.map((award) => (
              <div
                key={award.id}
                className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border transition-all duration-300 cursor-pointer ${
                  hoveredCard === award.id
                    ? "border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-lg shadow-amber-500/10"
                    : "border-slate-700/50 hover:border-slate-600/50"
                }`}
                onMouseEnter={() => setHoveredCard(award.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 filter drop-shadow-lg">
                    {award.icon}
                  </div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 border ${
                      hoveredCard === award.id
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {award.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">
                    {award.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    {award.description}
                  </p>
                  <div
                    className={`p-3 rounded-lg border ${
                      hoveredCard === award.id
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-slate-700/30 text-slate-400 border-slate-600/30"
                    }`}
                  >
                    <span className="font-medium text-sm">{award.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Expertise Section */}
        {activeSection === "expertise" && (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            {profileData.sections.expertise.domains.map((domain) => {
              const colors = getColorClasses(domain.color);
              return (
                <div
                  key={domain.area}
                  className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border transition-all duration-300 cursor-pointer ${
                    hoveredCard === domain.area
                      ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg`
                      : "border-slate-700/50 hover:border-slate-600/50"
                  }`}
                  onMouseEnter={() => setHoveredCard(domain.area)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="text-center mb-4">
                    <div
                      className={`${colors.bg} border ${colors.border} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl`}
                    >
                      {domain.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2">
                      {domain.area}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {domain.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-200 mb-3 text-center text-sm">
                      Core Skills:
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {domain.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            hoveredCard === domain.area
                              ? `bg-slate-700/50 ${colors.text} border-slate-600/50`
                              : `${colors.bg} ${colors.text} ${colors.border}`
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* What I Bring Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              What I Bring to Your Team
            </h2>
            <p className="text-slate-400">
              Key strengths and value I contribute
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                color: "purple",
                text: "Production experience building scalable SaaS platforms",
              },
              {
                color: "purple",
                text: "Strong backend architecture using Fastify, Prisma & PostgreSQL",
              },
              {
                color: "purple",
                text: "Workflow automation with Temporal, N8N & background job systems",
              },
              {
                color: "purple",
                text: "AI-driven integrations and intelligent system design",
              },
              {
                color: "purple",
                text: "White-labeling & multi-tenant system architecture experience",
              },
              {
                color: "purple",
                text: "Clean, maintainable full-stack development with Next.js & TypeScript",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50"
              >
                <div
                  className={`w-2 h-2 bg-${item.color}-400 rounded-full flex-shrink-0 animate-pulse`}
                ></div>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mt-6 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Ready to Build Something Amazing Together? 🚀
          </h2>
          <p className="text-slate-400 mb-6">
            Let's connect and discuss how my expertise can contribute to your
            next innovative project!
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <button
              onClick={openContactWindow}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/20 border border-blue-400/30"
            >
              Let's Connect! 🤝
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
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
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
