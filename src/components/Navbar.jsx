import { Link, useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

import { useAuth } from '../context/AuthContext'

import { searchMovies } from '../services/tmdb'



function Navbar() {

  const { user, logout } = useAuth()

  const navigate = useNavigate()



  const [search, setSearch] = useState('')

  const [suggestions, setSuggestions] = useState([])



  const handleLogout = async () => {

    await logout()

    navigate('/')

  }



  useEffect(() => {

    const fetchSuggestions = async () => {

      if (search.trim() === '') {

        setSuggestions([])

        return
      }



      const results = await searchMovies(search)

      setSuggestions(results.slice(0, 5))
    }



    const timeout = setTimeout(() => {

      fetchSuggestions()

    }, 300)



    return () => clearTimeout(timeout)

  }, [search])



  const handleSearch = (e) => {

    e.preventDefault()

    if (search.trim() !== '') {

      navigate(`/search?query=${search}`)

      setSuggestions([])
    }
  }



  const handleSuggestionClick = (movieId) => {

    navigate(`/movie/${movieId}`)

    setSearch('')

    setSuggestions([])
  }



  return (

    <nav className="bg-black text-white px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between border-b border-zinc-800 gap-5 relative z-50">

      {/* LOGO */}

      <Link
        to="/home"
        className="text-4xl font-black text-yellow-400"
      >

        CinemaVerse

      </Link>

      <Link to="/profile">
           Profile
      </Link>

      <Link to="/ai">
          AI Assistant
      </Link>



      {/* SEARCH */}

      <div className="relative w-full lg:w-[500px]">

        <form
          onSubmit={handleSearch}
          className="flex"
        >

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-zinc-900 text-white px-5 py-3 rounded-l-2xl outline-none"
          />



          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 rounded-r-2xl font-bold"
          >

            Search

          </button>

        </form>



        {/* AUTOCOMPLETE */}

        {suggestions.length > 0 && (

          <div className="absolute top-full left-0 right-0 bg-zinc-900 rounded-2xl mt-3 overflow-hidden shadow-2xl border border-zinc-800">

            {suggestions.map((movie) => (

              <div
                key={movie.id}
                onClick={() => handleSuggestionClick(movie.id)}
                className="flex items-center gap-4 p-4 hover:bg-zinc-800 cursor-pointer transition"
              >

                <img
                  className="w-14 h-20 object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />



                <div>

                  <h3 className="font-bold text-lg">
                    {movie.title}
                  </h3>

                  <p className="text-zinc-400">

                    ⭐ {movie.vote_average}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>



      {/* RIGHT SIDE */}

      <div className="flex items-center gap-6">

        <Link
          to="/favorites"
          className="hover:text-yellow-400 transition"
        >

          Favorites

        </Link>



        <div className="flex items-center gap-4">

          <span className="text-zinc-400 hidden md:block">

            {user?.email}

          </span>



          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
          >

            Logout

          </button>

        </div>

      </div>

    </nav>

  )
}

export default Navbar