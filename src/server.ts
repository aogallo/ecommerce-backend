import { ApolloServer } from '@apollo/server'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from '@graphql-tools/schema'

import resolvers from '@resolvers/index'
import typeDefs from '@graphqlTypes/index'

import { permissions } from '@permissions/permissions'
interface UserInformation {
  roles: string[]
  permissions: string[]
}

export interface UserToken {
  userInfo: UserInformation
  iat: number
  exp: number
  sub: string
}

export interface MyContext {
  user?: Omit<UserToken, 'userInfo'> & UserInformation
}

export const server = new ApolloServer<MyContext>({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    permissions,
  ),
})
