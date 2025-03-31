"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import DescriptionBox from "../../../components/DescriptionBox"

interface MovieRecommendation {
  id: number
  title: string
  overview: string
  releaseDate: string
  voteAverage: number
  posterPath: string | null
}

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
]

const ageRatings = [
  { label: "Kids (G-PG)", value: "kids" },
  { label: "Teens (PG-13)", value: "teen" },
  { label: "Adults (R, NC-17)", value: "adult" },
]

export default function MovieRecommendations() {
  const [genre, setGenre] = useState("")
  const [timePreference, setTimePreference] = useState("")
  const [ageRating, setAgeRating] = useState("")
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/movies?genre=${genre}&timePreference=${timePreference}&ageRating=${ageRating}`)
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }
      const data = await response.json()
      setRecommendations(data)
    } catch (err) {
      setError("Failed to get movie recommendations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie Recommendations</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <DescriptionBox>
            <p className="text-gray-300 font-serif text-lg leading-relaxed">
              Discover your next favorite film with our intelligent movie recommendation system. This project harnesses
              the power of The Movie Database (TMDb) API to provide personalized movie suggestions based on your
              preferences. Here's how it works:
            </p>
            <ol className="list-decimal list-inside text-gray-300 font-serif text-lg leading-relaxed mt-4 space-y-2">
              <li>You select your preferred genre, release time frame, and age rating.</li>
              <li>Our system queries the TMDb API, accessing its vast database of films and TV shows.</li>
              <li>
                Advanced filtering algorithms process the API data, considering factors like user ratings, vote counts,
                and release dates.
              </li>
              <li>The system then curates a list of top recommendations that match your criteria.</li>
              <li>Each recommendation includes key details like synopsis, release date, and average rating.</li>
            </ol>
            <p className="text-gray-300 font-serif text-lg leading-relaxed mt-4">
              This tool demonstrates the power of API integration and data processing in creating a personalized user
              experience. Whether you're a casual viewer or a film enthusiast, our recommendation system helps you
              navigate the vast world of cinema to find hidden gems and beloved classics alike.
            </p>
          </DescriptionBox>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select a genre...</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Movie Age Preference</label>
              <select
                value={timePreference}
                onChange={(e) => setTimePreference(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select preference...</option>
                <option value="new">Recent (last 5 years)</option>
                <option value="old">Classic (older than 10 years)</option>
                <option value="any">No preference</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Age Rating</label>
              <select
                value={ageRating}
                onChange={(e) => setAgeRating(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select age rating...</option>
                {ageRatings.map((rating) => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              disabled={loading}
            >
              {loading ? "Getting Recommendations..." : "Get Recommendations"}
            </button>
          </form>
        </div>

        {error && <div className="text-red-400 text-center mb-6">{error}</div>}

        {recommendations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Your Recommendations</h2>
            {recommendations.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="md:flex">
                  {movie.posterPath && (
                    <div className="md:flex-shrink-0">
                      <Image
                        src={movie.posterPath || "/placeholder.svg"}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="h-48 w-full object-cover md:h-full md:w-48"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(movie.title + " movie")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold mb-2 text-blue-400 hover:text-blue-300 underline inline-block"
                      >
                        {movie.title}
                      </a>
                      <span className="text-blue-400">★ {movie.voteAverage.toFixed(1)}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      Released: {new Date(movie.releaseDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300">{movie.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

