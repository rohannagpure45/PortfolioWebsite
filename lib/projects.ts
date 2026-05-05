export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Stock Analyzer",
    date: "Mar 2025",
    description:
      "An AI-powered tool using TensorFlow.js to analyze and predict stock market trends. Utilizes a pre-trained neural network model to forecast stock prices based on historical data.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h6ap4fzocELMoWax9HkVAKJ2YJA7T3.png",
    link: "/projects/stock-analyzer",
    tags: ["TensorFlow.js", "AI/ML", "Finance"],
  },
  {
    id: 2,
    title: "Movie Recommendations",
    date: "Jan 2025",
    description:
      "A personalized movie recommendation system using TMDb API. Implements advanced filtering and sorting algorithms for highly relevant suggestions.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j39qIVhl5NW7U4tHfbO66QcV0ZjIyJ.png",
    link: "/projects/movie-recommendations",
    tags: ["React", "TMDb API", "Algorithms"],
  },
  {
    id: 3,
    title: "AI Healthcare Chatbot",
    date: "Oct 2024",
    description:
      "A state-of-the-art AI chatbot for healthcare that assists with preliminary diagnosis and answers common health queries using NLP.",
    image: "/img01.jpg",
    link: "https://vite-react-supabase.vercel.app/",
    tags: ["NLP", "Healthcare", "Chatbot"],
  },
  {
    id: 4,
    title: "CutSchedule",
    date: "Nov 2025",
    description:
      "Modern appointment booking platform for barbers featuring SMS reminders, Google Calendar integration, and admin dashboard. Built with Next.js and PostgreSQL.",
    image: "/cutschedule.png",
    link: "https://cut-schedule-ck4d12342.vercel.app",
    tags: ["Next.js", "PostgreSQL", "Twilio"],
  },
  {
    id: 5,
    title: "AIR Health Coach",
    date: "Apr 2026",
    description:
      "Privacy-first AI exercise analysis platform using MediaPipe pose estimation and Gemini AI. Analyzes movement form, detects fatigue, and tracks rehabilitation progress — all processed locally.",
    image: "/yoga-pose.jpg",
    link: "https://github.com/rohannagpure45/RohanNagpureACMHackathon2",
    tags: ["Computer Vision", "FastAPI", "React", "AI"],
  },
  {
    id: 6,
    title: "Vantage",
    date: "Feb 2026",
    description:
      "Multi-Agent Catastrophic Risk Simulation Platform that analyzes second and third-order effects of global disasters. Powered by GPT-5.2 and MiniMax M2.5 for agent orchestration with WebGL geospatial visualization.",
    image: "/vantage.svg",
    link: "https://vantage-e4c8.vercel.app/?_vercel_share=k0hGIheFcKvUgBj6gmkktPfQ4Uh41DtA",
    tags: ["Next.js", "AI Agents", "WebGL", "Risk Simulation"],
  },
  {
    id: 7,
    title: "Operator News Curation",
    date: "Mar 2026",
    description:
      "Intelligent web agent that autonomously extracts, fact-checks, and summarizes content from news articles, X/Twitter, and SEC filings. Outputs PDF reports, executive briefings, and dashboards.",
    image: "/news-curation.svg",
    link: "https://github.com/rohannagpure45/operatorNewsCuration",
    tags: ["Python", "AI Agent", "LLM", "Fact-Checking"],
  },
  {
    id: 8,
    title: "Kalshi NBA",
    date: "May 2026",
    description:
      "Quantitative trading system for NBA prediction markets on Kalshi. Models in-game win probabilities and player prop outcomes to identify mispriced contracts in real time.",
    image: "/kalshi-nba.svg",
    link: "https://github.com/rohannagpure45/kalshiNBA",
    tags: ["Python", "Quant", "Prediction Markets", "NBA"],
  },
];
