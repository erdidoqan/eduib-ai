"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MdOutlineAnalytics, MdFunctions, MdCalculate } from "react-icons/md"

const courses = [
  {
    title: "IB Math AA SL",
    color: "bg-gradient-to-r from-blue-500/90 to-blue-400/90",
    hoverColor: "hover:from-blue-500 hover:to-blue-400",
    icon: <MdFunctions className="w-6 h-6" />,
    sections: [
      {
        title: "Analysis & Approaches SL",
        icon: <MdOutlineAnalytics className="w-5 h-5 text-blue-500" />,
        description: "Standard Level",
        levels: [
          { name: "Questionbank", description: "Practice questions" },
          { name: "Key Concepts", description: "Essential topics" },
        ],
      },
    ],
  },
  {
    title: "IB Math AA HL",
    color: "bg-gradient-to-r from-purple-500/90 to-purple-400/90",
    hoverColor: "hover:from-purple-500 hover:to-purple-400",
    icon: <MdFunctions className="w-6 h-6" />,
    sections: [
      {
        title: "Analysis & Approaches HL",
        icon: <MdOutlineAnalytics className="w-5 h-5 text-purple-500" />,
        description: "Higher Level",
        levels: [
          { name: "Questionbank", description: "Advanced practice" },
          { name: "Key Concepts", description: "In-depth topics" },
        ],
      },
    ],
  },
  {
    title: "IB Math AI SL",
    color: "bg-gradient-to-r from-green-500/90 to-green-400/90",
    hoverColor: "hover:from-green-500 hover:to-green-400",
    icon: <MdCalculate className="w-6 h-6" />,
    sections: [
      {
        title: "Applications & Interpretation SL",
        icon: <MdCalculate className="w-5 h-5 text-green-500" />,
        description: "Standard Level",
        levels: [
          { name: "Questionbank", description: "Applied questions" },
          { name: "Key Concepts", description: "Practical topics" },
        ],
      },
    ],
  },
  {
    title: "IB Math AI HL",
    color: "bg-gradient-to-r from-red-500/90 to-red-400/90",
    hoverColor: "hover:from-red-500 hover:to-red-400",
    icon: <MdCalculate className="w-6 h-6" />,
    sections: [
      {
        title: "Applications & Interpretation HL",
        icon: <MdCalculate className="w-5 h-5 text-red-500" />,
        description: "Higher Level",
        levels: [
          { name: "Questionbank", description: "Advanced applied practice" },
          { name: "Key Concepts", description: "Complex practical topics" },
        ],
      },
    ],
  },
]

export function CourseSelector() {
  return (
    <div className="w-full mt-12">
      <div className="relative">
        <div className="absolute -top-8 right-4 flex items-center gap-2 text-white/90 italic">
          <span className="text-sm">Pick a course</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform -rotate-90">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Accordion type="single" collapsible className="space-y-0">
          {courses.map((course, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`${course.color} ${course.hoverColor} transition-all duration-300 first:rounded-t-2xl last:rounded-b-2xl overflow-hidden border-none shadow-lg`}
            >
              <AccordionTrigger className="px-6 py-4 text-white hover:no-underline group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    {course.icon}
                  </div>
                  <span className="text-xl font-semibold">{course.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-white/10 px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.sections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-50 rounded-lg">{section.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-800">{section.title}</h3>
                          <p className="text-sm text-gray-500">{section.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {section.levels.map((level, levelIdx) => (
                          <button
                            key={levelIdx}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-gray-600 flex items-center justify-between group transition-colors"
                          >
                            <div>
                              <span className="font-medium">{level.name}</span>
                              <span className="text-sm text-gray-400 ml-2">{level.description}</span>
                            </div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transform group-hover:translate-x-1 transition-transform"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
