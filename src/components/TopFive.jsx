import { useEffect, useState } from 'react'

import MovieCard from './MovieCard'

import { fetchMovieDetails } from '../services/tmdb'

function TopFive() {

  const [movies, setMovies] = useState([])

  /*
    =========================================
    CHANGE THESE MOVIE IDS ANYTIME YOU WANT
    THESE ARE YOUR PERSONAL PICKS
    =========================================
  */

  const developerTopPicks = [

    157336, // Interstellar

    155, // The Dark Knight

    27205, // Inception

    603, // The Matrix

    680 // Pulp Fiction

  ]

  useEffect(() => {

    const loadMovies = async () => {

      const movieData = await Promise.all(

        developerTopPicks.map((id) =>
          fetchMovieDetails(id)
        )

      )

      setMovies(movieData)

    }

    loadMovies()

  }, [])

  return (

    <div className="px-8 lg:px-20 py-20 bg-black text-white">

      {/* HEADER */}

      <div className="mb-14">

        <h1 className="text-5xl lg:text-6xl font-black">
          ⭐ Arnav’s Top 5 Picks
        </h1>

        <p className="text-zinc-400 text-xl mt-4">
          Handpicked favorite movies curated by the creator of CinemaVerse
        </p>

      </div>

      {/* MOVIES */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

        {movies.map((movie, index) => (

          <div
            key={movie.id}
            className="relative"
          >

            {/* RANK BADGE */}

            <div className="absolute -top-5 -left-5 z-20 bg-yellow-400 text-black text-3xl font-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl">

              #{index + 1}

            </div>

            <MovieCard movie={movie} />

          </div>

        ))}

      </div>

    </div>

  )
}

export default TopFive