import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieSection from '../components/MovieSection'

import TopFive from '../components/TopFive'
import UserTopFive from '../components/UserTopFive'

import {
  fetchTrendingMovies,
  fetchHollywoodMovies,
  fetchBollywoodMovies,
  fetchTamilMovies,
  fetchTeluguMovies
} from '../services/tmdb'

function Home() {

  const [trendingMovies, setTrendingMovies] = useState([])

  const [hollywoodMovies, setHollywoodMovies] = useState([])

  const [bollywoodMovies, setBollywoodMovies] = useState([])

  const [tamilMovies, setTamilMovies] = useState([])

  const [teluguMovies, setTeluguMovies] = useState([])

  useEffect(() => {

    const loadMovies = async () => {

      const trending = await fetchTrendingMovies()

      const hollywood = await fetchHollywoodMovies()

      const bollywood = await fetchBollywoodMovies()

      const tamil = await fetchTamilMovies()

      const telugu = await fetchTeluguMovies()

      setTrendingMovies(trending)

      setHollywoodMovies(hollywood)

      setBollywoodMovies(bollywood)

      setTamilMovies(tamil)

      setTeluguMovies(telugu)
    }

    loadMovies()

  }, [])

  return (

    <div className="bg-black min-h-screen">

      <Navbar />

      <Hero />

      {/* DEVELOPER TOP 5 */}

      <TopFive />

      {/* USER TOP 5 */}

      <UserTopFive />

      {/* MOVIE SECTIONS */}

      <MovieSection
        title="Trending Movies"
        movies={trendingMovies}
      />

      <MovieSection
        title="Hollywood Movies"
        movies={hollywoodMovies}
      />

      <MovieSection
        title="Bollywood Movies"
        movies={bollywoodMovies}
      />

      <MovieSection
        title="Tamil Movies"
        movies={tamilMovies}
      />

      <MovieSection
        title="Telugu Movies"
        movies={teluguMovies}
      />

    </div>

  )
}

export default Home