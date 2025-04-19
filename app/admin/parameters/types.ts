export interface SubTopic {
  id: string
  name: string
  specificTopics: string[]
}

export interface Topic {
  id: string
  name: string
  subtopics: SubTopic[]
}

export interface Course {
  id: string
  name: string
  topics: Topic[]
}

export interface Difficulty {
  id: string
  name: string
  level: number
}

export const DEFAULT_COURSES: Course[] = [
  {
    id: "math-sl-aa",
    name: "IB Math SL AA",
    topics: [
      {
        id: "numbers-and-algebra",
        name: "Numbers and Algebra",
        subtopics: [
          {
            id: "sequences-and-series",
            name: "Sequences and Series",
            specificTopics: [
              "Arithmetic Sequences",
              "Geometric Sequences",
              "Series",
              "Sigma Notation",
              "Convergence and Divergence"
            ]
          },
          {
            id: "exponents-and-logarithms",
            name: "Exponents and Logarithms",
            specificTopics: [
              "Laws of Exponents",
              "Laws of Logarithms",
              "Exponential Functions",
              "Logarithmic Functions"
            ]
          }
        ]
      },
      {
        id: "functions",
        name: "Functions",
        subtopics: [
          {
            id: "function-concepts",
            name: "Function Concepts",
            specificTopics: [
              "Domain and Range",
              "Function Notation",
              "Composite Functions",
              "Inverse Functions"
            ]
          },
          {
            id: "quadratic-functions",
            name: "Quadratic Functions",
            specificTopics: [
              "Completing the Square",
              "Quadratic Formula",
              "Properties of Parabolas",
              "Applications"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "math-hl-aa",
    name: "IB Math HL AA",
    topics: [
      {
        id: "calculus",
        name: "Calculus",
        subtopics: [
          {
            id: "differentiation",
            name: "Differentiation",
            specificTopics: [
              "Limits and Continuity",
              "Rules of Differentiation",
              "Applications of Derivatives",
              "Implicit Differentiation"
            ]
          },
          {
            id: "integration",
            name: "Integration",
            specificTopics: [
              "Indefinite Integrals",
              "Definite Integrals",
              "Integration Techniques",
              "Applications of Integration"
            ]
          }
        ]
      }
    ]
  }
]

export const DIFFICULTIES: Difficulty[] = [
  { id: "easy", name: "Easy", level: 1 },
  { id: "medium", name: "Medium", level: 2 },
  { id: "hard", name: "Hard", level: 3 }
] 