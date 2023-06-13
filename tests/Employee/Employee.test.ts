import { type ApolloServer } from '@apollo/server'
import { connect, type Mongoose } from 'mongoose'

import { type MyContext, createSchema } from '@src/server'
import type { GraphQLResponseTest } from '@tests/CommonTestTypes/CommonTestTypes'
import { RoleModel } from '@entities/Roles/Roles'

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

describe('Employee Unit Test', () => {
  test('Create a Employee', async () => {
    const newUser = {
      email: 'rootTest@gmail.com',
      name: 'root test',
      username: 'rootTest',
      password: '123',
    }

    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: `#graphql
        mutation CreateEmployee ($employee: UserInput!) {
          createEmployee(employee: $employee) {
            createdAt
            updatedAt
            id
            username
            name
            email
            roles {
              createdAt
              updatedAt
              id
              name
            }
          }
        }
      `,
      variables: { employee: newUser },
    })) as GraphQLResponseTest

    newUser.email = 'test@gmail.com'
    newUser.username = 'test'
    newUser.name = 'Test'

    const responseUserTwo = (await serverTest.executeOperation({
      query: `#graphql
        mutation CreateEmployee($employee: UserInput!) {
          createEmployee(employee: $employee) {
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
      variables: { employee: newUser },
    })) as GraphQLResponseTest

    expect(responseUserTwo.body.singleResult.errors).toBeUndefined()
    expect(responseUserTwo.body.singleResult.data).toHaveProperty(
      'createEmployee.email',
      newUser.email,
    )
  })

  test('Retrieve User by Id', async () => {
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query:
        'query Query($id: String!) { employee(id: $id) { id username name email  } }',
      variables: { id: '646bb061d0e3c346d5e58370' },
    })) as GraphQLResponseTest

    expect(response.body.singleResult.errors).toBeUndefined()
  })

  test('Retrieve all Employees', async () => {
    const response = (await serverTest.executeOperation({
      query: 'query Query { employees { id username name email  } }',
    })) as GraphQLResponseTest

    expect(response.body.singleResult.errors).toBeUndefined()

    if (
      response.body.singleResult.data != null ||
      response.body.singleResult.data !== undefined
    ) {
      const users = response.body.singleResult.data.employees
      expect(users.length).toBeGreaterThan(0)
    }
  })
})
