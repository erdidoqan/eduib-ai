'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Latex from 'react-latex'
import "katex/dist/katex.min.css"

interface QuestionDisplayProps {
  question: string
  solution: string
  language: "en" | "tr"
}

function formatLatexContent(content: string): React.JSX.Element {
  // Replace any remaining LaTeX display math delimiters with $ for proper rendering
  content = content.replace(/\\\[/g, "$").replace(/\\\]/g, "$")

  // Split the content by lines
  const lines = content.split("\n")

  // Process each line
  return (
    <div className="latex-content">
      {lines.map((line, index) => {
        // Skip empty lines
        if (line.trim() === "") return <br key={index} />

        // Check if line contains LaTeX math expressions
        if (line.includes("$")) {
          return (
            <div key={index} className="my-2">
              <Latex>{line}</Latex>
            </div>
          )
        }

        // Check if line is a section header
        if (line.trim() === "Solution:") {
          return (
            <h3 key={index} className="text-xl font-bold mt-6 mb-3">
              {line}
            </h3>
          )
        }

        // Check if line starts with (a), (b), etc.
        if (line.trim().match(/^\([a-z]\)/)) {
          return (
            <div key={index} className="font-semibold mt-4 mb-2">
              {line}
            </div>
          )
        }

        // Regular text
        return (
          <p key={index} className="my-2">
            {line}
          </p>
        )
      })}
    </div>
  )
}

export function QuestionDisplay({ question, solution, language }: QuestionDisplayProps) {
  const [showSolution, setShowSolution] = useState(false)

  const translations = {
    en: {
      question: "Question",
      showSolution: "Show Solution",
      hideSolution: "Hide Solution"
    },
    tr: {
      question: "Soru",
      showSolution: "Çözümü Göster",
      hideSolution: "Çözümü Gizle"
    }
  }

  const t = translations[language]

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">{t.question}</h3>
        <div className="prose max-w-none">
          {formatLatexContent(question)}
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={() => setShowSolution(!showSolution)}
          variant="outline"
        >
          {showSolution ? t.hideSolution : t.showSolution}
        </Button>
      </div>

      {showSolution && (
        <div className="rounded-lg border p-4 mt-4">
          <div className="prose max-w-none">
            {formatLatexContent(solution)}
          </div>
        </div>
      )}
    </div>
  )
} 