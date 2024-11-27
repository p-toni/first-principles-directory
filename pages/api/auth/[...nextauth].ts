import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Missing GitHub OAuth credentials')
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Add other providers here
  ],
  secret: process.env.NEXTAUTH_SECRET || 'development-secret',
})
