"use client"

import { useState, useEffect, useRef } from "react"
import skillsData from "../data/skills.json"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const SkillBar = ({ skill, index }) => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setWidth(skill.level)
        }, index * 100)
        return () => clearTimeout(timer)
      }
    }, [isVisible, skill.level, index])

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{skill.icon}</span>
            <span className="text-gray-300 font-medium">{skill.name}</span>
          </div>
          <span className="text-blue-400 font-semibold">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-gray-800/50 p-2 rounded-full backdrop-blur-sm">
              {skillsData.categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === index
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillsData.categories[activeCategory].skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`transition-all duration-500 transform ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <SkillBar skill={skill} index={index} />
              </div>
            ))}
          </div>

          {/* Mobile Skills Overview */}
          <div className="mt-16 md:hidden">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-300">All Skills</h3>
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {skillsData.categories
                .flatMap((category) => category.skills)
                .map((skill, index) => (
                  <div
                    key={`${skill.name}-${index}`}
                    className="flex-shrink-0 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm min-w-[120px] text-center"
                  >
                    <div className="text-3xl mb-2">{skill.icon}</div>
                    <div className="text-sm text-gray-300 font-medium">{skill.name}</div>
                    <div className="text-xs text-blue-400 mt-1">{skill.level}%</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
