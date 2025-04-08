"use client";

import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AI Stock Analyzer",
    description:
      "An AI-powered tool using TensorFlow.js to analyze and predict stock market trends. This project utilizes a pre-trained neural network model to forecast stock prices based on historical data.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h6ap4fzocELMoWax9HkVAKJ2YJA7T3.png",
    link: "/projects/stock-analyzer",
  },
  {
    id: 2,
    title: "Movie Recommendations",
    description:
      "A personalized movie recommendation system using The Movie Database (TMDb) API. It implements advanced filtering and sorting algorithms to provide highly relevant suggestions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j39qIVhl5NW7U4tHfbO66QcV0ZjIyJ.png",
    link: "/projects/movie-recommendations",
  },
  {
    id: 3,
    title: "AI Healthcare Chatbot",
    description:
      "A state-of-the-art AI chatbot for healthcare that assists with preliminary diagnosis and answers common health queries using natural language processing.",
    image: "/img01.jpg",
    link: "https://vite-react-supabase.vercel.app/",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            A showcase of my work in finance, technology, and more!
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <div className="container mx-auto px-4 pb-12 flex-grow">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
                <p className="mb-4">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 transition-colors font-medium"
                  >
                    Try it out &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
