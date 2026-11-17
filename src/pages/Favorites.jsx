import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'

import { useAuth } from '../context/AuthContext'

import {
  getFavorites,
  removeFavorite
} from '../services/favorites'

import { Link } from 'react-router-dom'



function Favorites() {

  const { user } = useAuth()

  const [favorites, setFavorites] = useState([])



  const loadFavorites = async () => {

    const data =
      await getFavorites(user.uid)

    setFavorites(data)
  }



  useEffect(() => {

    if (user) {

      loadFavorites()

    }

  }, [user])



  const handleRemove = async (
    docId
  ) => {

    await removeFavorite(docId)

    loadFavorites()
  }



  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />



      <div className="px-8 lg:px-20 py-16">

        <h1 className="text-5xl font-black mb-12">

          ❤️ Your Favorites

        </h1>



        {favorites.length === 0 ? (

          <p className="text-zinc-400 text-2xl">

            No favorites added yet.

          </p>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {favorites.map((movie) => (

              <div
                key={movie.docId}
                className="bg-zinc-900 rounded-3xl overflow-hidden"
              >

                <Link to={`/movie/${movie.movieId}`}>

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.title}
                    className="w-full h-[350px] object-cover"
                  />

                </Link>



                <div className="p-5">

                  <h2 className="font-bold text-xl">

                    {movie.title}

                  </h2>



                  <p className="text-zinc-400 mt-2">

                    ⭐ {movie.rating}

                  </p>



                  <button
                    onClick={() =>
                      handleRemove(movie.docId)
                    }
                    className="bg-red-500 px-5 py-3 rounded-xl mt-5 w-full font-bold"
                  >

                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default Favorites