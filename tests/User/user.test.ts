import resolvers from '@resolvers/index'
import typeDefs from '@graphqlTypes/index'
import { ApolloServer } from '@apollo/server'

// beforeAll(() => {
//   console.log('1 - beforeAll')
// })
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
