"use client"

import { useState, useEffect, useMemo } from "react"
import personalData from "../data/personal.json"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTitle, setCurrentTitle] = useState("")
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const titles = useMemo(() => [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Innovator",
  ], [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const current = titles[titleIndex]
    if (charIndex <= current.length) {
      const timeout = setTimeout(() => {
        setCurrentTitle(current.slice(0, charIndex))
        setCharIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const delay = setTimeout(() => {
        setCharIndex(0)
        setTitleIndex((prev) => (prev + 1) % titles.length)
      }, 2000)
      return () => clearTimeout(delay)
    }
  }, [charIndex, titleIndex, titles])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {personalData.name}
            </span>
          </h1>

          <div className="h-16 mb-6">
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
              {currentTitle}
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">{personalData.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToAbout}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Explore My Work
            </button>

            <a
              href={`mailto:${personalData.email}`}
              className="px-8 py-3 border-2 border-blue-500 rounded-full text-blue-400 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-200"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            {Object.entries(personalData.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-200"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {platform === "github" && "🐙"}
                  {platform === "linkedin" && "💼"}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
