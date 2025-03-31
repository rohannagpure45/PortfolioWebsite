import { NextResponse } from "next/server"

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_API_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre")
  const timePreference = searchParams.get("timePreference")
  const ageRating = searchParams.get("ageRating")

  try {
    // Get genre ID
    const genresResponse = await fetch(`${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
    const genresData = await genresResponse.json()
    const genreId = genresData.genres.find(
      (g: { name: string; id: number }) => g.name.toLowerCase() === genre?.toLowerCase(),
    )?.id

    // Set up date filter based on time preference
    const currentDate = new Date()
    let releaseDateGte = undefined
    if (timePreference === "new") {
      const fiveYearsAgo = new Date()
      fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5)
      releaseDateGte = fiveYearsAgo.toISOString().split("T")[0]
    } else if (timePreference === "old") {
      const tenYearsAgo = new Date()
      tenYearsAgo.setFullYear(currentDate.getFullYear() - 10)
      releaseDateGte = undefined
    }

    // Set up certification filter based on age rating
    let certifications = ""
    if (ageRating === "kids") {
      certifications = "&certification_country=US&certification.lte=PG"
    } else if (ageRating === "teen") {
      certifications = "&certification_country=US&certification=PG-13"
    } else if (ageRating === "adult") {
      certifications = "&certification_country=US&certification.gte=R"
    }

    // Fetch movies with minimum review count of 100
    const moviesResponse = await fetch(
      `${TMDB_API_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&vote_count.gte=100${
        releaseDateGte ? `&primary_release_date.gte=${releaseDateGte}` : ""
      }${certifications}&sort_by=vote_average.desc&vote_count.gte=100`,
    )
    const moviesData = await moviesResponse.json()

    // Return top 5 recommendations
    const recommendations = moviesData.results.slice(0, 5).map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    }))

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error fetching movie recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch movie recommendations" }, { status: 500 })
  }
}

