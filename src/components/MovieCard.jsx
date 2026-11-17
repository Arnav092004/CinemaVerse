import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import { addFavorite } from '../services/favorites'



function MovieCard({ movie }) {

  const { user } = useAuth()



  const handleFavorite = async () => {

    await addFavorite(
      user.uid,
      movie
    )

    alert('Added to favorites')
  }



  return (

    <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition duration-300">

      <Link to={`/movie/${movie.id}`}>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[350px] object-cover"
        />

      </Link>



      <div className="p-5">

        <h2 className="text-xl font-bold">

          {movie.title}

        </h2>



        <p className="text-zinc-400 mt-2">

          ⭐ {movie.vote_average}

        </p>



        <p className="text-zinc-500 text-sm mt-1">

          {movie.release_date}
        </p>



        <button
          onClick={handleFavorite}
          className="bg-yellow-400 text-black px-5 py-3 rounded-xl mt-5 w-full font-bold hover:scale-105 transition"
        >

          ❤️ Add to Favorites

        </button>

      </div>

    </div>

  )
}

export default MovieCard