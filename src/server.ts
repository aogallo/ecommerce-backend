import { join } from 'path'

import { ApolloServer } from '@apollo/server'
import { applyMiddleware } from 'graphql-middleware'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { Container } from 'typedi'

import { permissions } from '@permissions/permissions'
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from './utils/customScalarIDType'

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

export const createSchema = async (): Promise<ApolloServer<MyContext>> => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    resolvers: [join(__dirname, '/resolvers/**/**Resolvers.{ts,js}')],
    validate: { forbidUnknownValues: false },
    container: Container,
  })
  // const schema = await buildSchema({
  //   resolvers: [join(__dirname, '/resolvers/**/**Resolvers.{ts,js}')],
  //   validate: { forbidUnknownValues: false },
  // })

  const server = new ApolloServer<MyContext>({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      permissions,
    ),
  })

  return server
}
