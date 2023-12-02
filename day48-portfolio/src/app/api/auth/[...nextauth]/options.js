import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { toast } from 'react-toastify'

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const data = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/${
              credentials.isSignup === 'true' ? 'register' : 'login'
            }`,
            {
              name: credentials.name,
              username: credentials.username,
              password: credentials.password
            }
          )
          if (data.data.body.user || data.data.body) {
            return data.data.body.user || data.data.body
          }
        } catch (error) {
          const errorMessage = error.response.data.error
        }
      }
    })
  ],
  callback: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  }
}
