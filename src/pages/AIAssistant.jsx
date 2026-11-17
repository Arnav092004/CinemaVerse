import { useState } from 'react'

import Navbar from '../components/Navbar'

import { askAI } from '../services/ai'



function AIAssistant() {

  const [prompt, setPrompt] = useState('')

  const [response, setResponse] = useState('')

  const [loading, setLoading] = useState(false)



  const handleAsk = async (e) => {

    e.preventDefault()

    if (prompt.trim() === '') return



    setLoading(true)

    const result = await askAI(prompt)

    setResponse(result)

    setLoading(false)
  }



  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />



      <div className="px-8 lg:px-20 py-16 max-w-5xl mx-auto">

        <h1 className="text-6xl font-black mb-6">

          🤖 AI Movie Assistant

        </h1>



        <p className="text-zinc-400 text-xl mb-12">

          Ask for movie recommendations,
          genres, moods, themes and more.
        </p>



        {/* INPUT */}

        <form
          onSubmit={handleAsk}
          className="flex flex-col gap-6"
        >

          <textarea
            rows="5"
            placeholder="Example: Suggest emotional sci-fi movies like Interstellar"
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-lg outline-none"
          ></textarea>



          <button
            type="submit"
            className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition"
          >

            Ask AI
          </button>

        </form>



        {/* RESPONSE */}

        <div className="mt-16">

          {loading ? (

            <div className="text-3xl">
              Thinking...
            </div>

          ) : response ? (

            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 whitespace-pre-line text-lg leading-relaxed">

              {response}

            </div>

          ) : null}

        </div>

      </div>

    </div>

  )
}

export default AIAssistant