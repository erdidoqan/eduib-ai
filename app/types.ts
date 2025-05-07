export interface Parameter {
  id: string
  name: string
  value: string
  course?: string
  children?: Parameter[]
}

export interface ParameterData {
  courses: Parameter[]
  version: string
  lastUpdated: string
}

export interface ApiResponse {
  success: boolean
  message?: string
  data?: any
}

export interface QuestionParameters {
  courseId?: string
  topicId?: string
  subtopicId?: string
  specificTopicId?: string
  difficulty?: string
} 