import type { ApolloServer } from '@apollo/server'
import { connect, type Mongoose } from 'mongoose'

import { type MyContext, createSchema } from '@src/server'

import type { GraphQLResponseTest } from '@tests/CommonTestTypes/CommonTestTypes'

let serverTest: ApolloServer<MyContext>
let connection: Mongoose

beforeAll(async () => {
  if (connection === null || connection === undefined) {
    connection = await connect(process.env.MONGO_URI ?? '', {
      dbName: 'test',
    })
  }
  await connection.connection.db.dropDatabase()
  serverTest = await createSchema()
})

afterAll(async () => {
  await connection.disconnect()
})

describe('Roles Unit Test', () => {
  test('Create a role', async () => {
    const testRole = { name: 'admin' }
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: `#graphql
        mutation CreateRole($role: RoleInput!) {
          createRole(role: $role) {
            id
            name
            createdAt
          }
        }
      `,
      variables: { role: testRole },
    })) as GraphQLResponseTest

    console.log(response.body.singleResult.data)

    expect(response.body.singleResult.data).toHaveProperty(
      'createRole.name',
      'admin',
    )

    expect(response.body.singleResult.errors).toBeUndefined()
  })
})
