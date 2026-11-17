import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchMovieCredits,
  fetchRecommendedMovies
} from '../services/tmdb'

import ReviewSection from '../components/ReviewSection'

import MovieCard from '../components/MovieCard'

function MovieDetails() {

  const { id } = useParams()

  const [movie, setMovie] = useState(null)

  const [trailer, setTrailer] = useState(null)

  const [cast, setCast] = useState([])

  const [recommendedMovies, setRecommendedMovies] = useState([])

  useEffect(() => {

    const loadMovie = async () => {

      const movieData = await fetchMovieDetails(id)

      const trailerData = await fetchMovieTrailer(id)

      const castData = await fetchMovieCredits(id)

      const recommendedData = await fetchRecommendedMovies(id)

      setMovie(movieData)

      setTrailer(trailerData)

      setCast(castData)

      setRecommendedMovies(recommendedData)

    }

    loadMovie()

  }, [id])

  if (!movie) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center text-white text-3xl">

        Loading...

      </div>

    )
  }

  return (

    <div className="bg-black min-h-screen text-white">

      {/* HERO SECTION */}

      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >

        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-10 px-8 lg:px-20 py-20 min-h-screen">

          <img
            className="w-[280px] lg:w-[350px] rounded-3xl shadow-2xl"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="max-w-4xl">

            <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
              {movie.title}
            </h1>

            <p className="text-zinc-300 text-lg lg:text-2xl mt-6 leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-8 mt-8 text-xl">

              <div>
                ⭐ {movie.vote_average}
              </div>

              <div>
                📅 {movie.release_date}
              </div>

              <div>
                ⏱️ {movie.runtime} mins
              </div>

            </div>

            <div className="flex flex-wrap gap-4 mt-8">

              {movie.genres?.map((genre) => (

                <span
                  key={genre.id}
                  className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-lg"
                >
                  {genre.name}
                </span>

              ))}

            </div>

          </div>

        </div>

      </div>



      {/* TRAILER */}

      {trailer && (

        <div className="px-8 lg:px-20 py-16 bg-black">

          <h2 className="text-4xl font-bold mb-10">
            Official Trailer
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-2xl">

            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>

          </div>

        </div>

      )}



      {/* CAST SECTION */}

      <div className="px-8 lg:px-20 py-16 bg-black">

        <h2 className="text-4xl font-bold mb-12">
          Top Cast
        </h2>

        <div className="flex gap-8 overflow-x-auto pb-4">

          {cast.map((actor) => (

            <div
              key={actor.cast_id}
              className="min-w-[180px] bg-zinc-900 rounded-3xl overflow-hidden"
            >

              <img
                className="w-full h-[250px] object-cover"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://placehold.co/300x450'
                }
                alt={actor.name}
              />

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {actor.name}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {actor.character}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ReviewSection movieId={id} />

      {/* RECOMMENDATIONS */}

<div className="px-8 lg:px-20 py-20 bg-black">

  <h2 className="text-5xl font-black mb-12">

    🔥 More Like This

  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

    {recommendedMovies.slice(0, 10).map((movie) => (

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

export default MovieDetails