import { type ApolloServer } from '@apollo/server'
import connectToMongodb from '@src/dataSources/mongo'
import { type MyContext, createSchema } from '@src/server'

let serverTest: ApolloServer<MyContext>

beforeAll(async () => {
  await connectToMongodb()
  serverTest = await createSchema()
})
afterAll(async () => {
  await serverTest.stop()
})

describe('User unit test', () => {
  test('Retrieve User by Id', async () => {
    const response = await serverTest.executeOperation({
      query: 'query Query { user }',
    })

    console.log('response', response)
    expect(response.body.kind).toBe('single')
  })
})
