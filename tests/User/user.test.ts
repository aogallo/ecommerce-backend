import { type ApolloServer } from '@apollo/server'
import connectToMongodb from '@src/dataSources/mongo'
import { type MyContext, createSchema } from '@src/server'

let serverTest: ApolloServer<MyContext>

beforeAll(async () => {
  await connectToMongodb()
  serverTest = await createSchema()
})
// afterAll(() => console.log('1 - afterAll'))
// beforeEach(() => console.log('1 - beforeEach'))
// afterEach(() => console.log('1 - afterEach'))

describe('User unit test', () => {
  test('Retrieve User by Id', async () => {
    const response = await serverTest.executeOperation({
      query: 'query Query { user }',
    })

    console.log('response', response)
    expect(response.body.kind).toBe('single')
  })
})
