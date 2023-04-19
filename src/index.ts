import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import resolvers from '@resolvers/index'
import typeDefs from '@graphqlTypes/index'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    console.log(`Server listening at: ${url} 🐳`)
  })
  .catch(() => {
    console.log(`Error in servers`)
  })
