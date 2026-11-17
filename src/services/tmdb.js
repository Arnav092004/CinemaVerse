import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = 'https://api.themoviedb.org/3'



export const fetchTrendingMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}



export const fetchHollywoodMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}



export const fetchBollywoodMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}



export const fetchTamilMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}



export const fetchTeluguMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}



export const fetchMovieDetails = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    )

    return response.data

  } catch (error) {

    console.log(error)

    return null

  }
}



export const fetchMovieTrailer = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    )

    const trailers = response.data.results

    const officialTrailer = trailers.find(
      (video) =>
        video.type === 'Trailer' &&
        video.site === 'YouTube'
    )

    return officialTrailer

  } catch (error) {

    console.log(error)

    return null

  }
}



export const searchMovies = async (query) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}



export const fetchMovieCredits = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    )

    return response.data.cast.slice(0, 10)

  } catch (error) {

    console.log(error)

    return []

  }
}

export const fetchRecommendedMovies = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

    return []

  }
}