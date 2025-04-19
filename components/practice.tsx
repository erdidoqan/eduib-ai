"use client"

import { Maximize2, BookOpen, Play, Sparkles, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Practice() {
  return (
    <section className="py-24 bg-[#16AB8E]/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a2b4c] mb-6">Practice IB Exam Style Questions</h2>
          <p className="text-lg text-[#4a5567] max-w-3xl mx-auto leading-relaxed">
            Thousands of exam style questions, filtered by topic, sub-topic & difficulty. Detailed and easy to
            understand mark-schemes and video solutions for all questions. Practice & master IB exam style questions.
          </p>
        </div>

        <Tabs defaultValue="mathematics" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white p-1 shadow-sm">
              <TabsTrigger
                value="mathematics"
                className="rounded-xl px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-[#16AB8E] data-[state=active]:text-white"
              >
                Mathematics
              </TabsTrigger>
              <TabsTrigger
                value="sciences"
                className="rounded-xl px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-[#16AB8E] data-[state=active]:text-white"
              >
                Sciences
              </TabsTrigger>
              <TabsTrigger
                value="human-sciences"
                className="rounded-xl px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-[#16AB8E] data-[state=active]:text-white"
              >
                Human Sciences
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="mathematics">
            <Card className="border-none rounded-2xl shadow-lg overflow-hidden">
              <CardHeader className="flex-row justify-between items-center space-y-0 pb-4 border-b">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1.5 bg-[#EBF3FA] text-[#4285f4] rounded-full text-sm font-medium inline-flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    CALCULATOR
                  </span>
                  <div className="flex items-center justify-center">
                    <span className="text-[#4a5567] text-sm font-medium mr-2">Medium</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-[#f4b940]" />
                      ))}
                      {[4, 5].map((i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-[#e5e7eb]" />
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-[#4a5567] hover:text-[#1a2b4c]">
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="grid md:grid-cols-[1fr,280px] gap-8 p-6">
                <div className="space-y-6">
                  <div className="text-sm text-[#4a5567]">[Maximum mark: 5]</div>
                  <div className="space-y-6">
                    <p className="text-[#1a2b4c] leading-relaxed">
                      A bouncy ball is dropped out of a second story classroom window, 5 m off the ground. Every time
                      the ball hits the ground it bounces 89 % of its previous height.
                    </p>
                    <div className="space-y-4">
                      <p className="text-[#1a2b4c]">
                        (a) Find the height the ball reaches after the 2nd bounce.
                        <span className="ml-2 text-[#4285f4]">[2]</span>
                      </p>
                      <p className="text-[#1a2b4c]">
                        (b) Find the total distance the ball has travelled when it hits the ground for the 5th time.
                        <span className="ml-2 text-[#4285f4]">[3]</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-[#EBF3FA] border-[#EBF3FA] text-[#1a2b4c] hover:bg-[#dce7f4] hover:border-[#dce7f4]"
                  >
                    <BookOpen className="h-4 w-4" />
                    Mark Scheme
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-[#EBF3FA] border-[#EBF3FA] text-[#1a2b4c] hover:bg-[#dce7f4] hover:border-[#dce7f4]"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Video Solutions
                    </div>
                    <span className="text-xs bg-[#4285f4] text-white px-1.5 py-0.5 rounded">2</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-[#EBF3FA] border-[#EBF3FA] text-[#1a2b4c] hover:bg-[#dce7f4] hover:border-[#dce7f4]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Newton AI
                  </Button>
                  <Button
                    variant="link"
                    className="w-full justify-start text-[#4285f4] hover:text-[#3b75d9] underline decoration-dashed"
                  >
                    Formula Booklet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sciences">
            <div className="h-[400px] flex items-center justify-center text-[#4a5567] bg-white rounded-2xl shadow-lg">
              Science questions coming soon...
            </div>
          </TabsContent>

          <TabsContent value="human-sciences">
            <div className="h-[400px] flex items-center justify-center text-[#4a5567] bg-white rounded-2xl shadow-lg">
              Human Sciences questions coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
