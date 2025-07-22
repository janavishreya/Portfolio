"use client"

import { useState, useEffect, useRef } from "react"
import experienceData from "../data/experience.json"

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
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

  const ExperienceCard = ({ experience, index, isLast }) => (
    <div className="relative flex items-start space-x-6">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg transform transition-all duration-500 ${
            isVisible ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        ></div>
        {!isLast && (
          <div
            className={`w-0.5 h-24 bg-gradient-to-b from-blue-400/50 to-purple-500/50 mt-2 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${index * 200 + 300}ms` }}
          ></div>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex-1 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-500 transform ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{experience.position}</h3>
            <h4 className="text-lg text-blue-400 font-semibold">{experience.company}</h4>
          </div>
          <div className="text-right">
            <div className="text-purple-400 font-medium">{experience.duration}</div>
          </div>
        </div>
        <p className="text-gray-300 mb-4 leading-relaxed">{experience.description}</p>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, techIndex) => (
            <span key={techIndex} className="px-3 py-1 bg-gray-700/50 text-blue-400 rounded-full text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {experienceData.experience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isLast={index === experienceData.experience.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
