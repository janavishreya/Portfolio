"use client"

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Hero from "../src/components/hero"
import About from "../src/components/about"
import Skills from "../src/components/skills"
import Projects from "../src/components/projects"
import Experience from "../src/components/experience"
import Contact from "../src/components/contact"
import Navigation from "../src/components/navigation"
import AnimatedBackground from "../src/components/animated_background"
import Certificates from "../src/components/certificates"

import "./index.css"

function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
