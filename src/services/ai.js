import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
export const askAI = async (prompt) => {

  try {

    const response = await axios.post(

      'https://openrouter.ai/api/v1/chat/completions',

      {

        model: 'openai/gpt-3.5-turbo',

        messages: [

          {

            role: 'system',

            content:
              'You are a movie recommendation expert.'

          },

          {

            role: 'user',

            content: prompt

          }

        ]

      },

      {

        headers: {

          Authorization: `Bearer ${API_KEY}`,

          'Content-Type': 'application/json'

        }

      }

    )



    return response.data.choices[0]
      .message.content

  } catch (error) {

    console.log(error.response?.data || error)

    return 'AI unavailable right now.'
  }
}