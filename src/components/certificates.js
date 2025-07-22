"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import certificateData from "../data/certificates.json"

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const navigate = useNavigate()

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

  const CertificateCard = ({ cert, index }) => (
    <div
      className={`group bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {cert.title}
        </h3>
        <p className="text-gray-400 text-sm">{cert.organization}</p>
        <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
      </div>
    </div>
  )

  return (
    <section id="certificates" ref={sectionRef} className="py-20 bg-gray-800/50 relative">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Close
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificateData.certificates.map((cert, index) => (
              <CertificateCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
