import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function QuestionCreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {/* Remove MathJax script since we're using react-latex with KaTeX */}
    </>
  )
}
