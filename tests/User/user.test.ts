import { buildTypeDefsAndResolvers, buildSchema } from 'type-graphql'
import { ApolloServer } from '@apollo/server'
import { join } from 'path'
import { type GraphQLSchema, graphql } from 'graphql'
import connectToMongodb from '@src/dataSources/mongo'
import { createSchema } from '@src/server'

let serverTest
// const schema = makeExecutableSchema({ typeDefs, resolvers });
beforeAll(async () => {
  jest.resetModules()
  await connectToMongodb()
  serverTest = await createSchema()
})
// afterAll(() => console.log('1 - afterAll'))
// beforeEach(() => console.log('1 - beforeEach'))
// afterEach(() => console.log('1 - afterEach'))
const userLogged = {
  roles: ['astronaut'],
  permissions: ['read:own_user'],
  iat: 1682984832,
  exp: 1683071232,
  sub: '67890',
}

interface ContextValue {
  user: typeof userLogged
}

describe('User unit test', () => {
  test('Retrieve User by Id', async () => {
    serverTest = await createSchema()

    const response = await serverTest.executeOperation({
      query: 'query Query { user }',
    })

    console.log('response', response)
    expect(response.body.kind).toBe('single')
  })
})
