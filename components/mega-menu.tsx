"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

const subjects = [
  {
    name: "IB Math AA SL",
    features: [
      { name: "Questionbank", url: "/math/aa-sl/questionbank" },
      { name: "Key Concepts", url: "/math/aa-sl/concepts" },
      { name: "Practice Exams", url: "/math/aa-sl/practice" },
      { name: "Past Papers", url: "/math/aa-sl/papers" },
      { name: "Bootcamps", url: "/math/aa-sl/bootcamps", beta: true },
    ],
  },
  {
    name: "IB Math AA HL",
    features: [
      { name: "Questionbank", url: "/math/aa-hl/questionbank" },
      { name: "Key Concepts", url: "/math/aa-hl/concepts" },
      { name: "Practice Exams", url: "/math/aa-hl/practice" },
      { name: "Past Papers", url: "/math/aa-hl/papers" },
      { name: "Bootcamps", url: "/math/aa-hl/bootcamps", beta: true },
    ],
  },
  {
    name: "IB Math AI SL",
    features: [
      { name: "Questionbank", url: "/math/ai-sl/questionbank" },
      { name: "Key Concepts", url: "/math/ai-sl/concepts" },
      { name: "Practice Exams", url: "/math/ai-sl/practice" },
      { name: "Past Papers", url: "/math/ai-sl/papers" },
      { name: "Bootcamps", url: "/math/ai-sl/bootcamps", beta: true },
    ],
  },
  {
    name: "IB Math AI HL",
    features: [
      { name: "Questionbank", url: "/math/ai-hl/questionbank" },
      { name: "Key Concepts", url: "/math/ai-hl/concepts" },
      { name: "Practice Exams", url: "/math/ai-hl/practice" },
      { name: "Past Papers", url: "/math/ai-hl/papers" },
      { name: "Bootcamps", url: "/math/ai-hl/bootcamps", beta: true },
    ],
  },
]

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubject, setActiveSubject] = useState(subjects[0])

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#16AB8E]"
        onMouseEnter={() => setIsOpen(true)}
      >
        Subjects
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-[600px] bg-white rounded-xl shadow-lg border mt-1 z-50">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 p-4 rounded-l-xl">
              <div className="space-y-1">
                {subjects.map((subject) => (
                  <button
                    key={subject.name}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg ${
                      activeSubject.name === subject.name
                        ? "bg-white text-[#16AB8E] shadow-sm"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                    onMouseEnter={() => setActiveSubject(subject)}
                  >
                    {subject.name}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <h3 className="font-medium text-gray-900 mb-4">{activeSubject.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                {activeSubject.features.map((feature) => (
                  <Link
                    key={feature.name}
                    href={feature.url}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-[#16AB8E]"
                  >
                    {feature.name}
                    {feature.beta && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-purple-100 text-purple-700 rounded">
                        BETA
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
