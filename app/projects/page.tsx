"use client";

import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AI Stock Analyzer",
    description:
      "An AI-powered tool using TensorFlow.js to analyze and predict stock market trends. Utilizes a pre-trained neural network model to forecast stock prices based on historical data.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h6ap4fzocELMoWax9HkVAKJ2YJA7T3.png",
    link: "/projects/stock-analyzer",
    tags: ["TensorFlow.js", "AI/ML", "Finance"],
  },
  {
    id: 2,
    title: "Movie Recommendations",
    description:
      "A personalized movie recommendation system using TMDb API. Implements advanced filtering and sorting algorithms for highly relevant suggestions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j39qIVhl5NW7U4tHfbO66QcV0ZjIyJ.png",
    link: "/projects/movie-recommendations",
    tags: ["React", "TMDb API", "Algorithms"],
  },
  {
    id: 3,
    title: "AI Healthcare Chatbot",
    description:
      "A state-of-the-art AI chatbot for healthcare that assists with preliminary diagnosis and answers common health queries using NLP.",
    image: "/img01.jpg",
    link: "https://vite-react-supabase.vercel.app/",
    tags: ["NLP", "Healthcare", "Chatbot"],
  },
  {
    id: 4,
    title: "CutSchedule",
    description:
      "Modern appointment booking platform for barbers featuring SMS reminders, Google Calendar integration, and admin dashboard. Built with Next.js and PostgreSQL.",
    image: "/cutschedule.png",
    link: "https://cut-schedule-ck4d12342.vercel.app",
    tags: ["Next.js", "PostgreSQL", "Twilio"],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center hero-gradient">
        <div className="accent-glow top-0 left-0 opacity-50" />

        <div className="relative z-10 text-center px-6 stagger-children">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#faf9f5]">
            My Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#b0aea5]">
            A showcase of my work in finance, technology, and full-stack development.
          </p>
        </div>
      </section>

      {/* Project Cards Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative overflow-hidden rounded-2xl card-elevated
                         transition-all duration-300 hover-lift cursor-pointer"
            >
              {/* Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 
                             group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/60 to-transparent" />

                {/* Tags overlay */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="badge text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#faf9f5] mb-3 
                               group-hover:text-[#d97757] transition-colors">
                  {project.title}
                </h2>
                <p className="text-[#b0aea5] mb-4 line-clamp-3">
                  {project.description}
                </p>
                <span className="text-[#d97757] font-medium inline-flex items-center gap-2 
                                 group-hover:gap-3 transition-all">
                  Explore Project
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
