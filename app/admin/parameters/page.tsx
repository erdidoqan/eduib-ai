"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Parameter, ApiResponse } from "../../types"

export default function ParametersPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<Parameter[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<"courses" | "topics" | "subtopics" | "specifics">("courses")
  const [selectedPath, setSelectedPath] = useState<string[]>([])

  // Load parameters on mount
  useEffect(() => {
    loadParameters()
  }, [])

  const loadParameters = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://eduib.com/api/parameters/last")
      if (!response.ok) {
        throw new Error("Failed to fetch parameters")
      }
      
      const apiResponse: ApiResponse = await response.json()
      setCourses(apiResponse.data.courses)
    } catch (error) {
      console.error("Error loading parameters:", error)
      setError("Failed to load parameters")
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLevelItems = (): Parameter[] => {
    let current = courses
    for (const pathId of selectedPath) {
      const found = current.find(item => item.id === pathId)
      if (found?.children) {
        current = found.children
      } else {
        return []
      }
    }
    return current
  }

  const handleAddItem = () => {
    if (!newItemName.trim()) return

    const newItem: Parameter = {
      id: newItemName.toLowerCase().replace(/\s+/g, "-"),
      name: newItemName,
      children: selectedLevel !== "specifics" ? [] : undefined
    }

    if (selectedPath.length === 0) {
      setCourses(prev => [...prev, newItem])
    } else {
      const updateNestedChildren = (items: Parameter[]): Parameter[] => {
        return items.map(item => {
          if (item.id === selectedPath[selectedPath.length - 1]) {
            return {
              ...item,
              children: [...(item.children || []), newItem]
            }
          } else if (item.children) {
            return {
              ...item,
              children: updateNestedChildren(item.children)
            }
          }
          return item
        })
      }

      setCourses(updateNestedChildren(courses))
    }

    setNewItemName("")
  }

  const handleDeleteItem = (itemId: string) => {
    const deleteFromLevel = (items: Parameter[]): Parameter[] => {
      return items.filter(item => {
        if (item.id === itemId) return false
        if (item.children) {
          item.children = deleteFromLevel(item.children)
        }
        return true
      })
    }

    setCourses(deleteFromLevel(courses))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)

      const parameterData = {
        courses,
        version: "1.0.0",
        lastUpdated: new Date().toISOString()
      }

      const response = await fetch("https://eduib.com/api/parameters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameterData),
      })

      if (!response.ok) {
        throw new Error("Failed to save parameters")
      }

      alert("Parameters saved successfully!")
    } catch (error) {
      console.error("Error saving parameters:", error)
      setError("Failed to save parameters. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading && courses.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Parameter Management</CardTitle>
                <CardDescription>Add, edit, or remove curriculum parameters</CardDescription>
              </div>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={selectedLevel} onValueChange={(value: any) => setSelectedLevel(value)}>
              <TabsList className="mb-4">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="subtopics">Subtopics</TabsTrigger>
                <TabsTrigger value="specifics">Specific Topics</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {/* Add New Item */}
                <div className="flex gap-2">
                  <Input
                    placeholder={`Add new ${selectedLevel.slice(0, -1)}...`}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                  <Button onClick={handleAddItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Current Level Items */}
                <div className="space-y-2">
                  {getCurrentLevelItems().map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.children && (
                          <p className="text-sm text-muted-foreground">
                            {item.children.length} sub-items
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {item.children && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPath([...selectedPath, item.id])}
                          >
                            View Sub-items
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Path */}
                {selectedPath.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPath([])}
                    >
                      Root
                    </Button>
                    {selectedPath.map((pathId, index) => {
                      let itemName = ""
                      let current = courses
                      for (let i = 0; i <= index; i++) {
                        const found = current.find(item => item.id === selectedPath[i])
                        if (found) {
                          if (i === index) itemName = found.name
                          current = found.children || []
                        }
                      }
                      
                      return (
                        <div key={pathId} className="flex items-center">
                          <span>/</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))}
                          >
                            {itemName}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 