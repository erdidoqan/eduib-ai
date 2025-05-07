"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { generateQuestion } from "./actions"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { QuestionDisplay } from "../components/QuestionDisplay"
import { Parameter, ApiResponse, QuestionParameters } from "../types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function QuestionCreatePage() {
  const [loading, setLoading] = useState(false)
  const [questionData, setQuestionData] = useState<{ question: string; solution: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [parameters, setParameters] = useState<Parameter[]>([])
  const [questionCount, setQuestionCount] = useState(0)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  
  const [selectedParams, setSelectedParams] = useState<QuestionParameters>({
    courseId: "",
    topicId: "",
    subtopicId: "",
    specificTopicId: "",
    difficulty: ""
  })

  // Load parameters on mount
  useEffect(() => {
    const loadParameters = async () => {
      try {
        const response = await fetch("https://eduib.com/api/parameters/last")
        if (!response.ok) {
          throw new Error("Failed to fetch parameters")
        }
        
        const apiResponse: ApiResponse = await response.json()
        setParameters(apiResponse.data.courses)
      } catch (error) {
        console.error("Error loading parameters:", error)
        setError("Failed to load parameters")
      }
    }

    loadParameters()
  }, [])

  // Load question count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('questionCount')
    if (savedCount) {
      setQuestionCount(parseInt(savedCount))
    }
  }, [])

  const getCurrentCourse = () => parameters.find(p => p.id === selectedParams.courseId)
  const getCurrentTopic = () => getCurrentCourse()?.children?.find(t => t.id === selectedParams.topicId)
  const getCurrentSubTopic = () => getCurrentTopic()?.children?.find(st => st.id === selectedParams.subtopicId)

  const handleParamChange = (key: keyof QuestionParameters, value: string) => {
    setSelectedParams(prev => {
      const newParams = { ...prev, [key]: value }
      
      // Reset dependent selections
      switch (key) {
        case "courseId":
          newParams.topicId = ""
          newParams.subtopicId = ""
          newParams.specificTopicId = ""
          break
        case "topicId":
          newParams.subtopicId = ""
          newParams.specificTopicId = ""
          break
        case "subtopicId":
          newParams.specificTopicId = ""
          break
      }
      
      return newParams
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user has reached the limit
    if (questionCount >= 3) {
      setShowPaymentDialog(true)
      return
    }

    setLoading(true)
    setError(null)
    setQuestionData(null)

    try {
      const course = getCurrentCourse()
      const topic = getCurrentTopic()
      const subtopic = getCurrentSubTopic()
      
      if (!course || !topic || !subtopic || 
          !selectedParams.specificTopicId || 
          !selectedParams.difficulty) {
        throw new Error("Please fill in all fields")
      }
      
      const prompt = `${course.name}
Topic: ${topic.name}
Subtopic: ${subtopic.name}
Specific Topic: ${selectedParams.specificTopicId}
Difficulty: ${selectedParams.difficulty}`

      const result = await generateQuestion(prompt)

      if (result.error) {
        setError(result.error)
      } else {
        setQuestionData({
          question: result.question,
          solution: result.solution
        })
        // Increment question count and save to localStorage
        const newCount = questionCount + 1
        setQuestionCount(newCount)
        localStorage.setItem('questionCount', newCount.toString())
      }
    } catch (error) {
      setError(`An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`)
      console.error("Error generating question:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentRedirect = () => {
    window.open('https://eduib.com/membership', '_blank')
  }

  return (
    <main className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 p-3 bg-[#16AB8E]/10 rounded-lg">
          <span className="font-medium text-[#16AB8E]">Free trial:</span>{" "}
          <span className="font-semibold text-[#1a2b4c]">{3 - questionCount} questions remaining</span>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-[1fr,1.2fr] gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Question Parameters</CardTitle>
              <CardDescription>Configure the parameters for the question you want to generate</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Selection */}
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select
                    value={selectedParams.courseId}
                    onValueChange={(value) => handleParamChange("courseId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {parameters.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic Selection */}
                {selectedParams.courseId && (
                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Select
                      value={selectedParams.topicId}
                      onValueChange={(value) => handleParamChange("topicId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentCourse()?.children?.map(topic => (
                          <SelectItem key={topic.id} value={topic.id}>
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Subtopic Selection */}
                {selectedParams.topicId && (
                  <div className="space-y-2">
                    <Label>Subtopic</Label>
                    <Select
                      value={selectedParams.subtopicId}
                      onValueChange={(value) => handleParamChange("subtopicId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subtopic" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentTopic()?.children?.map(subtopic => (
                          <SelectItem key={subtopic.id} value={subtopic.id}>
                            {subtopic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Specific Topic Selection */}
                {selectedParams.subtopicId && (
                  <div className="space-y-2">
                    <Label>Specific Topic</Label>
                    <Select
                      value={selectedParams.specificTopicId}
                      onValueChange={(value) => handleParamChange("specificTopicId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a specific topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentSubTopic()?.children?.map(topic => (
                          <SelectItem key={topic.id} value={topic.id}>
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Difficulty Selection */}
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={selectedParams.difficulty}
                    onValueChange={(value) => handleParamChange("difficulty", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !selectedParams.courseId || !selectedParams.topicId || 
                           !selectedParams.subtopicId || !selectedParams.specificTopicId || 
                           !selectedParams.difficulty}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Question"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Question</CardTitle>
              <CardDescription>The generated question will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : questionData ? (
                <QuestionDisplay 
                  question={questionData.question} 
                  solution={questionData.solution}
                  language="en"
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  No question generated yet. Configure the parameters and click generate.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#1a2b4c]">Free Trial Ended</DialogTitle>
              <DialogDescription className="text-[#4a5567] mt-2">
                You have used up your <b>3</b> question creation limit in your free trial. Please upgrade your membership to create more questions.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handlePaymentRedirect} className="bg-[#16AB8E] hover:bg-[#138F78] text-white">
                Upgrade Membership
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
