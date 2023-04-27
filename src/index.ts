import { type IncomingMessage } from 'http'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from '@graphql-tools/schema'

import resolvers from '@resolvers/index'
import typeDefs from '@graphqlTypes/index'

import { permissions } from '@permissions/permissions'

interface UserInformation {
  roles: string[]
  permissions: string[]
}

interface UserToken {
  userInfo: UserInformation
  iat: number
  exp: number
  sub: string
}

interface MyContext {
  user?: string
}

const server = new ApolloServer<MyContext>({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    permissions,
  ),
})

const getUser = (req: IncomingMessage): UserToken | null => {
  try {
    const tokenWithBearer = req.headers.authorization ?? ''
    const token = tokenWithBearer.split(' ')[1]
    if (token === '') {
      return null
    }

    const verifyToken: jwt.JwtPayload = jwt.verify(
      token,
      'SUPER_SECRET',
    ) as JwtPayload

    const { userInfo, iat, exp, sub } = verifyToken

    if (exp == null) {
      return null
    }

    if (Date.now() >= exp * 1000) {
      return null
    }

    return {
      ...userInfo,
      iat: iat as number,
      exp,
      sub: sub as string,
    }
  } catch (error) {
    return null
  }
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    user: getUser(req),
  }),
})
  .then(({ url }) => {
    console.log(`Server listening at: ${url} 🐳`)
  })
  .catch(() => {
    console.log(`Error in servers`)
  })
