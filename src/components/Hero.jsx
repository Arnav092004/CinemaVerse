import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { fetchTrendingMovies } from '../services/tmdb'

function Hero() {

  const [movie, setMovie] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {

    const loadHeroMovie = async () => {

      const movies = await fetchTrendingMovies()

      if (movies.length > 0) {

        const randomMovie =
          movies[Math.floor(Math.random() * movies.length)]

        setMovie(randomMovie)
      }
    }

    loadHeroMovie()

  }, [])

  if (!movie) {

    return (

      <div className="h-screen bg-black"></div>

    )
  }

  return (

    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
    >

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* CONTENT */}

      <div className="relative z-10 flex items-center h-full px-8 lg:px-20">

        <div className="max-w-3xl">

          {/* SMALL LABEL */}

          <p className="text-yellow-400 text-xl mb-4 font-bold tracking-widest uppercase">

            Featured Movie

          </p>

          {/* TITLE */}

          <h1 className="text-5xl lg:text-8xl font-black leading-tight text-white">

            {movie.title}

          </h1>

          {/* OVERVIEW */}

          <p className="text-zinc-300 text-lg lg:text-2xl mt-8 leading-relaxed">

            {movie.overview}

          </p>

          {/* BUTTONS */}

          <div className="flex gap-5 mt-10">

            {/* DETAILS BUTTON */}

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
            >
              ▶ View Details
            </button>

            {/* RATING */}

            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl text-xl text-white border border-white/20">

              ⭐ {movie.vote_average}

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM FADE */}

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>

    </div>

  )
}

export default Hero