import { Star } from "lucide-react"
import { CourseSelector } from "./course-selector"

export function Hero() {
  return (
    <section className="relative min-h-screen pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rv_banner_desktop-BAixUtWPVilPcb3sEB1gwYND3qLCNO.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.1) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-emerald-800/60" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          <div className="space-y-8 lg:w-2/3">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/10">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">Trusted by 85% of IBDP students globally</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
                The world&apos;s #1 IB DP Mathematics Platform{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 text-transparent bg-clip-text">
                  just got better!
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow backdrop-blur-sm">
                The platform designed to unlock your best academic results. Experience our award-winning IB Mathematics
                resource that&apos;s revolutionizing how students learn.
              </p>
            </div>
            <CourseSelector />
          </div>

          <div className="lg:w-1/3 space-y-6">
            {[
              { value: "4.5x", description: "More likely to score a 7", icon: "📈" },
              { value: "80%", description: "Students scored 5+", icon: "🎯" },
              { value: "#1", description: "Rated IB Math Platform", icon: "🏆" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-white/80 text-sm mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
