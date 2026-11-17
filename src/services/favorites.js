import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore'

import { db } from '../firebase'



// ADD FAVORITE

export const addFavorite = async (
  userId,
  movie
) => {

  try {

    await addDoc(collection(db, 'favorites'), {

      userId,

      movieId: movie.id,

      title: movie.title,

      poster: movie.poster_path,

      rating: movie.vote_average,

      releaseDate: movie.release_date

    })

  } catch (error) {

    console.log(error)

  }
}



// GET FAVORITES

export const getFavorites = async (userId) => {

  try {

    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId)
    )



    const querySnapshot = await getDocs(q)



    return querySnapshot.docs.map((doc) => ({

      docId: doc.id,

      ...doc.data()

    }))

  } catch (error) {

    console.log(error)

    return []

  }
}



// REMOVE FAVORITE

export const removeFavorite = async (
  docId
) => {

  try {

    await deleteDoc(
      doc(db, 'favorites', docId)
    )

  } catch (error) {

    console.log(error)

  }
}