import MovieCard from './MovieCard'

function MovieSection({ title, movies }) {

  return (

    <div className="px-8 lg:px-20 py-14 bg-black text-white">

      {/* SECTION HEADER */}

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl lg:text-5xl font-black">
          {title}
        </h1>

        <button className="text-yellow-400 text-lg hover:text-yellow-300 transition">
          View All
        </button>

      </div>

      {/* MOVIES ROW */}

      <div className="flex gap-7 overflow-x-auto pb-4">

        {movies && movies.length > 0 ? (

          movies.map((movie) => (

            <div
              key={movie.id}
              className="flex-shrink-0 w-[230px]"
            >

              <MovieCard movie={movie} />

            </div>

          ))

        ) : (

          <p className="text-zinc-400">
            Loading movies...
          </p>

        )}

      </div>

    </div>

  )
}

export default MovieSection