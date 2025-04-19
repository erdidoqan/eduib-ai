"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen, FileText, GraduationCap, Lightbulb, ChevronRight } from "lucide-react"

type FeatureContent = {
  title: string
  subtitle: string
  description: string
  content: {
    left: { title: string; description: string }[]
    right: { title: string; description: string }[]
  }
  bgColor: string
  hoverColor: string
}

const features: {
  id: string
  title: string
  icon: React.ReactNode
  content: FeatureContent
}[] = [
  {
    id: "questionbank",
    title: "Questionbank",
    icon: <BookOpen className="w-5 h-5" />,
    content: {
      title: "Topic 2",
      subtitle: "Functions",
      description:
        "All the questions you could need! Sorted by topic and arranged by difficulty, with schemes and video solutions for every question.",
      content: {
        left: [
          {
            title: "Topic 1 All",
            description: "All Questions in Topic 2 Functions",
          },
          {
            title: "Exponent-Log Functions",
            description: "Exponential Functions & Graphs, Logarithmic Functions & Graphs, Asymptotes...",
          },
        ],
        right: [
          {
            title: "Properties of Functions",
            description:
              "Domain & Range, Composite Functions, Inverse Functions, Max-Min, Intercepts, Intersects, Sketching",
          },
          {
            title: "Transformations",
            description: "Translations/Shifts, Reflections, Stretches, Notation, Graphing, Composite Transformations",
          },
        ],
      },
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
  },
  {
    id: "past-papers",
    title: "Past Papers",
    icon: <FileText className="w-5 h-5" />,
    content: {
      title: "IB Math",
      subtitle: "Past Papers",
      description:
        "Access a comprehensive collection of past IB Mathematics examination papers, complete with detailed solutions and marking schemes.",
      content: {
        left: [
          {
            title: "2022-2023 Papers",
            description: "Latest examination papers with complete solutions",
          },
          {
            title: "Topic-wise Papers",
            description: "Past papers organized by mathematical topics",
          },
        ],
        right: [
          {
            title: "Paper Analysis",
            description: "Detailed analysis of question patterns and trends",
          },
          {
            title: "Mark Schemes",
            description: "Official IB marking schemes and examiner reports",
          },
        ],
      },
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
  },
  {
    id: "practice-exams",
    title: "Practice Exams",
    icon: <GraduationCap className="w-5 h-5" />,
    content: {
      title: "Practice",
      subtitle: "Mock Exams",
      description:
        "Prepare thoroughly with our carefully crafted mock exams that mirror the actual IB Mathematics examination format and difficulty level.",
      content: {
        left: [
          {
            title: "Full Mock Exams",
            description: "Complete practice papers with time management tips",
          },
          {
            title: "Topic Tests",
            description: "Focused assessments for specific mathematical concepts",
          },
        ],
        right: [
          {
            title: "Timed Practice",
            description: "Simulated exam conditions with timer and scoring",
          },
          {
            title: "Performance Analysis",
            description: "Detailed feedback and improvement suggestions",
          },
        ],
      },
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
  },
  {
    id: "key-concepts",
    title: "Key Concepts",
    icon: <Lightbulb className="w-5 h-5" />,
    content: {
      title: "Master",
      subtitle: "Key Concepts",
      description:
        "Build a strong foundation with clear explanations and visual representations of essential mathematical concepts and principles.",
      content: {
        left: [
          {
            title: "Core Concepts",
            description: "Fundamental mathematical principles and theories",
          },
          {
            title: "Visual Learning",
            description: "Interactive diagrams and graphical explanations",
          },
        ],
        right: [
          {
            title: "Concept Maps",
            description: "Connected learning paths and relationship diagrams",
          },
          {
            title: "Quick Reviews",
            description: "Rapid revision guides for key topics",
          },
        ],
      },
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
    },
  },
]

export function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-800 leading-tight">
                What makes Revision Village so effective?
              </h2>
              <div className="space-y-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature)}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`w-full flex items-center justify-between p-6 rounded-xl text-left transition-all ${
                      activeFeature.id === feature.id
                        ? feature.content.bgColor
                        : hoveredFeature === feature.id
                          ? feature.content.hoverColor
                          : "hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          activeFeature.id === feature.id || hoveredFeature === feature.id
                            ? "bg-[#16AB8E] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <span
                        className={`font-semibold ${
                          activeFeature.id === feature.id || hoveredFeature === feature.id
                            ? "text-navy-800"
                            : "text-gray-600"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        activeFeature.id === feature.id || hoveredFeature === feature.id
                          ? "text-[#16AB8E] rotate-90"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`rounded-3xl p-8 shadow-lg border border-gray-100 transition-colors duration-300 ${activeFeature.content.bgColor}`}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">{activeFeature.content.title}</div>
                  <h3 className="text-2xl font-bold text-navy-800">{activeFeature.content.subtitle}</h3>
                </div>
                <p className="text-gray-600">{activeFeature.content.description}</p>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-4">
                    {activeFeature.content.content.left.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="font-medium text-navy-800">{item.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {activeFeature.content.content.right.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="font-medium text-navy-800">{item.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
