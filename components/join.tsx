"use client"

import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "It helped me a lot with my physics exam as I was able to revise and work on questions for every single topic individually.",
    author: "Courtney E.",
    details: "IBDP Student Australia, 2022.",
  },
  {
    quote: "I love the organization of the site and the videos especially helped a lot.",
    author: "Issac J.",
    details: "IBDP Student USA, 2021.",
  },
  {
    quote: "RV helped me a lot with understanding topics and its questionbanks were challenging yet awesome.",
    author: "Kim G.",
    details: "IBDP Student Australia, 2020.",
  },
]

export function Join() {
  return (
    <section className="py-24 bg-[#0A5446]">
      {" "}
      {/* Changed to dark green */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Join over 80% of the world&apos;s IB educators &amp; students
          </h2>
          <p className="text-lg text-[#16AB8E]">Try RV for free</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button size="lg" variant="outline" className="bg-white text-[#0A5446] hover:bg-gray-100 border-white">
            Educators - Join Now
          </Button>
          <Button size="lg" className="bg-[#16AB8E] hover:bg-[#138F78] text-white border-none">
            Students - Join Now
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#0C6554]/50 backdrop-blur-sm rounded-2xl p-8 space-y-4">
              <p className="text-white/90 leading-relaxed">{testimonial.quote}</p>
              <div className="space-y-1">
                <p className="text-white font-medium">{testimonial.author}</p>
                <p className="text-white/60 text-sm">{testimonial.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
