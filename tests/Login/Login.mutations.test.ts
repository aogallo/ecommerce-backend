import resolvers from '@resolvers/index'
import typeDefs from '@graphqlTypes/index'
import { ApolloServer } from '@apollo/server'

beforeAll(() => {
  const testServer = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
  })
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

describe('Login mutation tests', () => {
  test('LogIn the application', async () => {
    const testServer = new ApolloServer<ContextValue>({
      typeDefs,
      resolvers,
    })
    const response = await testServer.executeOperation({
      query: 'query Query { getUserById { id email username } }',
    })

    console.log(response.body.singleResult.data?.getUserById)

    expect(response.body.singleResult.errors).toBeUndefined()

    expect(response.body.singleResult.data?.getUserById).toEqual({
      id: '111',
      email: 'test@gmail.com',
      username: 'aogallo',
    })
  })
})
