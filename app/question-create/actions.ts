"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface QuestionResponse {
  question: string;
  solution: string;
  error?: string;
}

export async function generateQuestion(prompt: string): Promise<QuestionResponse> {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return {
        question: "",
        solution: "",
        error: "OpenAI API key is not configured. Please contact the administrator.",
      }
    }

    const { text } = await generateText({
      model: openai("gpt-4.1"),
      prompt: prompt,
      system: `You are an expert IB Mathematics teacher with deep knowledge of the IB curriculum. 
Your task is to create high-quality, curriculum-aligned questions. 
Provide both the question and a detailed solution.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS EXAMPLE:

Consider a geometric sequence where the first term is $a_1 = 3$ and the common ratio is $r = 2$.

(a) Find the 8th term of the sequence.

(b) Calculate the sum of the first 8 terms of the sequence.

(c) If the sum of the first $n$ terms of this sequence is 1533, find the value of $n$.

Solution:

(a) For a geometric sequence with first term $a_1$ and common ratio $r$, the $n$th term is given by $a_n = a_1 r^{n-1}$.

Substituting $a_1 = 3$, $r = 2$, and $n = 8$:
$a_8 = 3 \cdot 2^{8-1} = 3 \cdot 2^7 = 3 \cdot 128 = 384$

(b) The sum of the first $n$ terms of a geometric sequence is given by $S_n = \\frac{a_1(1-r^n)}{1-r}$ when $r \\neq 1$.

Substituting $a_1 = 3$, $r = 2$, and $n = 8$:
$S_8 = \\frac{3(1-2^8)}{1-2} = \\frac{3(1-256)}{-1} = \\frac{3(-255)}{-1} = 765$

IMPORTANT FORMATTING RULES:
1. Use simple plain text format with math expressions in $ symbols (single dollar signs for inline math)
2. Do NOT use LaTeX document structure commands like \\begin{document}, \\documentclass, etc.
3. Do NOT use \\[ and \\] for math expressions - ALWAYS use $ symbols
4. Use (a), (b), (c) for question parts
5. Include "Solution:" before the solution section
6. Leave blank lines between parts for readability
7. Make sure all math expressions are properly enclosed in $ symbols
8. Use proper spacing and indentation for clarity`,
    })

    // Replace any remaining \[ and \] with $ to ensure proper rendering
    const processedText = text.replace(/\\\[/g, "$").replace(/\\\]/g, "$")

    // Split the text into question and solution parts
    const parts = processedText.split("Solution:")
    if (parts.length !== 2) {
      throw new Error("Unexpected response format from AI")
    }

    return {
      question: parts[0].trim(),
      solution: parts[1].trim(),
    }
  } catch (error) {
    console.error("Error generating question:", error)
    return {
      question: "",
      solution: "",
      error: `Error generating question: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
