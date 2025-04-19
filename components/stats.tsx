import { Trophy, TrendingUp, Users } from "lucide-react"

export function Stats() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-navy-800 leading-tight">
              Over 80% of IB students globally are experiencing the power of Revision Village
            </h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#FDF6E7]">
                  <Trophy className="w-8 h-8 text-[#16AB8E]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy-800 mb-2">#1 IB Math Resource</h3>
                  <p className="text-gray-600">
                    Revision Village is ranked the #1 IB Math Resources by IB Students & Teachers.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#FDF0F0]">
                  <TrendingUp className="w-8 h-8 text-[#16AB8E]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy-800 mb-2">34% Grade Increase</h3>
                  <p className="text-gray-600">
                    Revision Village students scored 34% greater than the IB Global Average in their exams (2021).
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#EDF5FF]">
                  <Users className="w-8 h-8 text-[#16AB8E]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy-800 mb-2">80% of IB Students</h3>
                  <p className="text-gray-600">
                    More and more IB students are using Revision Village to prepare for their IB Math Exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
