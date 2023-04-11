import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
  type Book {
    title: String
    author: String
    new: Boolean
  }

  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The awakeining',
    author: 'Kate Chopin',
    new: true,
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    new: false,
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })

// eslint-disable-next-line no-console
console.log(`Server listening at: ${url} 🐳`)
