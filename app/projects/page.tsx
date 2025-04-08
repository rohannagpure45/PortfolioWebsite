import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AI Stock Analyzer",
    description:
      "An AI-powered tool using TensorFlow.js to analyze and predict stock market trends. This project utilizes a pre-trained neural network model to forecast stock prices based on historical data. It combines machine learning algorithms with real-time market data to provide insights and recommendations for potential investments.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h6ap4fzocELMoWax9HkVAKJ2YJA7T3.png",
    link: "/projects/stock-analyzer",
  },
  {
    id: 2,
    title: "Movie Recommendations",
    description:
      "A personalized movie recommendation system using The Movie Database (TMDb) API. This project leverages user preferences for genre, time period, and age rating to curate a list of film suggestions. It implements advanced filtering and sorting algorithms to provide highly relevant movie recommendations based on user input and TMDb's extensive database.",
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden shadow-lg bg-gray-900">
              <div className="relative h-48">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
                {project.link && (
                  <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Try it out →
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

