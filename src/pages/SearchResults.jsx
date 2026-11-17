import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import Navbar from '../components/Navbar'

import MovieCard from '../components/MovieCard'

import { searchMovies } from '../services/tmdb'



function SearchResults() {

  const location = useLocation()

  const query =
    new URLSearchParams(location.search).get('query')



  const [movies, setMovies] = useState([])

  const [loading, setLoading] = useState(true)



  useEffect(() => {

    const fetchResults = async () => {

      setLoading(true)

      const results = await searchMovies(query)

      setMovies(results)

      setLoading(false)

    }



    if (query) {

      fetchResults()

    }

  }, [query])



  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />



      <div className="px-8 lg:px-20 py-16">

        <h1 className="text-5xl font-black mb-12">

          Search Results For:

          <span className="text-yellow-400 ml-4">

            {query}

          </span>

        </h1>



        {loading ? (

          <div className="text-3xl">
            Loading...
          </div>

        ) : movies.length === 0 ? (

          <div className="text-2xl text-zinc-400">

            No movies found.

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {movies.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default SearchResults