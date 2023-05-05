import resolvers from '@resolvers/index'
import typeDefs from '@graphqlTypes/index'
import { ApolloServer } from '@apollo/server'

let testServer: ApolloServer<ContextValue>

beforeAll(() => {
  testServer = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
  })

  return testServer
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
  describe('LogIn the application', () => {
    test('Empty username and password', async () => {
      const response = await testServer.executeOperation({
        query:
          'mutation Login($username: String!, $password: String!) { login(username: $username, password: $password) }',
        variables: {
          username: '',
          password: '',
        },
      })

      expect(response.body.singleResult.data.login).toBe('')
    })
  })
})
