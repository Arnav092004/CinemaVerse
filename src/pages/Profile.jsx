import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'

import { useAuth } from '../context/AuthContext'

import { signOut } from 'firebase/auth'

import { auth, db } from '../firebase'

import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'



function Profile() {

  const { user } = useAuth()



  const [favoritesCount, setFavoritesCount] =
    useState(0)

  const [reviewsCount, setReviewsCount] =
    useState(0)



  useEffect(() => {

    if (user) {

      loadStats()

    }

  }, [user])



  const loadStats = async () => {

    // FAVORITES

    const favQuery = query(
      collection(db, 'favorites'),
      where('userId', '==', user.uid)
    )



    const favSnapshot =
      await getDocs(favQuery)



    setFavoritesCount(
      favSnapshot.docs.length
    )



    // REVIEWS

    const reviewQuery = query(
      collection(db, 'reviews'),
      where(
        'userEmail',
        '==',
        user.email
      )
    )



    const reviewSnapshot =
      await getDocs(reviewQuery)



    setReviewsCount(
      reviewSnapshot.docs.length
    )
  }



  const handleLogout = async () => {

    await signOut(auth)

  }



  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />



      <div className="px-8 lg:px-20 py-16">

        <div className="bg-zinc-900 rounded-3xl p-10 max-w-4xl mx-auto border border-zinc-800">

          {/* PROFILE HEADER */}

          <div className="flex flex-col lg:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-yellow-400 flex items-center justify-center text-black text-5xl font-black">

              {user?.email?.charAt(0).toUpperCase()}

            </div>



            <div>

              <h1 className="text-5xl font-black">

                Your Profile

              </h1>



              <p className="text-zinc-400 text-xl mt-3">

                {user?.email}

              </p>

            </div>

          </div>



          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

            <div className="bg-black p-8 rounded-3xl border border-zinc-800">

              <h2 className="text-zinc-400 text-lg">

                Favorite Movies
              </h2>

              <p className="text-5xl font-black mt-4 text-yellow-400">

                {favoritesCount}
              </p>

            </div>



            <div className="bg-black p-8 rounded-3xl border border-zinc-800">

              <h2 className="text-zinc-400 text-lg">

                Reviews Posted
              </h2>

              <p className="text-5xl font-black mt-4 text-yellow-400">

                {reviewsCount}
              </p>

            </div>

          </div>



          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="bg-red-500 px-8 py-4 rounded-2xl font-bold mt-16 hover:scale-105 transition"
          >

            Logout

          </button>

        </div>

      </div>

    </div>

  )
}

export default Profile