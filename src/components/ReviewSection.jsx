import { useEffect, useState } from 'react'

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore'

import { db } from '../firebase'

import { useAuth } from '../context/AuthContext'



function ReviewSection({ movieId }) {

  const { user } = useAuth()



  const [reviews, setReviews] = useState([])

  const [rating, setRating] = useState('')

  const [comment, setComment] = useState('')



  const fetchReviews = async () => {

    const q = query(
      collection(db, 'reviews'),
      where('movieId', '==', movieId),
      orderBy('createdAt', 'desc')
    )



    const querySnapshot = await getDocs(q)

    const reviewList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))



    setReviews(reviewList)
  }



  useEffect(() => {

    fetchReviews()

  }, [movieId])



  const handleSubmit = async (e) => {

    e.preventDefault()



    if (
      rating.trim() === '' ||
      comment.trim() === ''
    ) {
      return
    }



    try {

      await addDoc(collection(db, 'reviews'), {

        movieId,

        userEmail: user.email,

        rating,

        comment,

        createdAt: Date.now()

      })



      setRating('')

      setComment('')



      fetchReviews()

    } catch (error) {

      console.log(error)

    }
  }



  return (

    <div className="px-8 lg:px-20 py-20 bg-black text-white">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">

          💬 Community Reviews

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Reviews from all CinemaVerse users

        </p>

      </div>



      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-3xl mb-16"
      >

        <div className="grid grid-cols-1 gap-6">

          <input
            type="number"
            placeholder="Rating (1-10)"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-black border border-zinc-700 px-5 py-4 rounded-2xl outline-none"
          />

        </div>



        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          className="bg-black border border-zinc-700 px-5 py-4 rounded-2xl outline-none w-full mt-6"
        ></textarea>



        <button
          type="submit"
          className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold mt-6 hover:scale-105 transition"
        >

          Submit Review

        </button>

      </form>



      {/* REVIEWS */}

      <div className="space-y-8">

        {reviews.length === 0 ? (

          <p className="text-zinc-500 text-xl">

            No reviews yet.

          </p>

        ) : (

          reviews.map((review) => (

            <div
              key={review.id}
              className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800"
            >

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold">

                    {review.userEmail}

                  </h2>

                </div>



                <div className="bg-yellow-400 text-black px-5 py-2 rounded-full font-black text-lg">

                  ⭐ {review.rating}/10

                </div>

              </div>



              <p className="text-zinc-300 text-lg mt-6 leading-relaxed">

                {review.comment}

              </p>

            </div>

          ))

        )}

      </div>

    </div>

  )
}

export default ReviewSection