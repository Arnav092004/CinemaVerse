import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

import { auth } from '../firebase'



function Auth() {

  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const navigate = useNavigate()



  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (isLogin) {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

       navigate('/home')

      } else {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        alert('Account created')

      }

    } catch (error) {

      alert(error.message)

    }
  }



  const handleGoogleLogin = async () => {

    try {

      const provider = new GoogleAuthProvider()

      await signInWithPopup(auth, provider)

      navigate('/home')

    } catch (error) {

      alert(error.message)

    }
  }



  return (

    <div className="bg-black min-h-screen flex items-center justify-center px-6">

      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md">

        <h1 className="text-white text-4xl font-black mb-8 text-center">

          {isLogin ? 'Login' : 'Create Account'}

        </h1>



        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 text-white p-4 rounded-2xl outline-none"
          />



          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 text-white p-4 rounded-2xl outline-none"
          />



          <button
            type="submit"
            className="bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
          >

            {isLogin ? 'Login' : 'Sign Up'}

          </button>

        </form>



        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold mt-5 hover:scale-105 transition"
        >

          Continue with Google

        </button>



        <p className="text-zinc-400 text-center mt-6">

          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-400 ml-2"
          >

            {isLogin ? 'Sign Up' : 'Login'}

          </button>

        </p>

      </div>

    </div>

  )
}

export default Auth