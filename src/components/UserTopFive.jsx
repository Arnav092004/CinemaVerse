import { useEffect, useState } from 'react'

import MovieCard from './MovieCard'

function UserTopFive() {

  const [favorites, setFavorites] = useState([])

  useEffect(() => {

    const loadFavorites = () => {

      const storedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || []

      setFavorites(storedFavorites)
    }

    loadFavorites()

    window.addEventListener(
      'favoritesUpdated',
      loadFavorites
    )

    return () => {

      window.removeEventListener(
        'favoritesUpdated',
        loadFavorites
      )
    }

  }, [])

  return (

    <div className="px-8 lg:px-20 py-20 bg-black text-white">

      <div className="mb-12">

        <h1 className="text-5xl font-bold">
          ❤️ Your Top 5 Favorites
        </h1>

        <p className="text-zinc-400 mt-3 text-lg">
          Your personal favorite movies
        </p>

      </div>

      {favorites.length === 0 ? (

        <p className="text-zinc-500 text-xl">
          Add movies to favorites ❤️
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {favorites.map((movie, index) => (

            <div key={movie.id} className="relative">

              <div className="absolute -top-5 -left-5 z-20 bg-red-500 text-white text-3xl font-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl">

                {index + 1}

              </div>

              <MovieCard movie={movie} />

            </div>

          ))}

        </div>

      )}

    </div>

  )
}

export default UserTopFive