"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import personalData from "../data/personal.json";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">{personalData.bio}</p>

              <div className="grid grid-cols-2 gap-6">
                {/* Certificates Card - navigates to /certificates */}
                <div
                  onClick={() => navigate("/certificates")}
                  className="cursor-pointer bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-600 transition"
                >
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">5+</h3>
                  <p className="text-gray-300">Certificates</p>
                </div>

                <div className="bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">5+</h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>

                <div className="bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-pink-400 mb-2">50+</h3>
                  <p className="text-gray-300">Leetcode problems</p>
                </div>

                <div className="bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-green-400 mb-2">24/7</h3>
                  <p className="text-gray-300">Availability</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-20"></div>
                <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>

              <div className="absolute top-10 -right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
                <div className="text-sm font-semibold">Always Learning!</div>
              </div>

              <div
                className="absolute bottom-10 -left-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-sm font-semibold">Problem Solver</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
