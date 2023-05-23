import type { ApolloServer } from '@apollo/server'
import { type MyContext, createSchema } from '@src/server'
import { connect, type Mongoose } from 'mongoose'
import type { GraphQLResponseTest } from '../CommonTestTypes/CommonTestTypes'
import { RoleModel } from '@entities/Roles/Roles'
import expect from 'expect'

let serverTest: ApolloServer<MyContext>
let connection: Mongoose

beforeAll(async () => {
  if (connection === null || connection === undefined) {
    connection = await connect(process.env.MONGO_URI ?? '', {
      dbName: 'test',
    })
  }
  await connection.connection.db.dropDatabase()
  const role = await RoleModel.create({ name: 'admin' })
  await role.save()
  serverTest = await createSchema()
})

afterAll(async () => {
  await connection.disconnect()
})

// describe('Test', () => {
//   test('me', () => {
//     console.log('success')
//   })
// })

describe('User Unit Test', () => {
  test('Create a User', async () => {
    const newUser = {
      email: 'rootTest@gmail.com',
      name: 'root test',
      username: 'rootTest',
      password: '123',
    }

    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: `
        mutation CreateUser($user: UserInput!) {
          createUser(user: $user) {
            id
            username
            name
            email
            roles {
              id
              name
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
        }
      `,
      variables: { user: newUser },
    })) as GraphQLResponseTest

    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data).toHaveProperty(
      'createUser.email',
      newUser.email,
    )
  })

  test('Retrieve User by Id', async () => {
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query:
        'query Query($id: String!) { user(id: $id) { id username name email  } }',
      variables: { id: '646bb061d0e3c346d5e58370' },
    })) as GraphQLResponseTest

    expect(response.body.singleResult.errors).toBeUndefined()
  })

  test('Retrieve all Users', async () => {
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: 'query Query { users { id username name email  } }',
    })) as GraphQLResponseTest

    // expect(response.body.singleResult.data?.users).toBeGreaterThan(0)
    console.log('data', response.body.singleResult.data?.users)
    console.log(typeof response.body.singleResult.data)
    expect(response.body.singleResult.errors).toBeUndefined()
  })
})
