import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import Navbar from '../components/Navbar'

import { searchMovies } from '../services/tmdb'

import MovieCard from '../components/MovieCard'

function Movies() {

  const [movies, setMovies] = useState([])

  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')

  useEffect(() => {

    const loadMovies = async () => {

      const data = await searchMovies(query)

      setMovies(data)

    }

    if (query) {

      loadMovies()

    }

  }, [query])

  return (

    <div>

      <Navbar />

      <div className="bg-black min-h-screen text-white p-8">

        <h1 className="text-5xl font-bold mb-10">
          Search Results
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {movies.map((movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
            />

          ))}

        </div>

      </div>

    </div>

  )
}

export default Movies