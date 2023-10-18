import 'reflect-metadata'
import type { ApolloServer } from '@apollo/server'
import { connect, type Mongoose } from 'mongoose'

import { type MyContext, createSchema } from '@src/server'

import { isAdmin } from '@tests/utils/permissions'
import { EmployeeModel } from '@entities/Employee/Employee'
import { RoleModel } from '@entities/Roles/Roles'

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
  const role = await RoleModel.create({ name: 'admin' })
  const roleTest = await role.save()
  const userInput = {
    username: 'test',
    name: 'TestUser',
    email: 'test@gmail.com',
    password: 'testpassword',
  }

  const user = await EmployeeModel.create({
    ...userInput,
    roles: [roleTest.id],
  })

  await user.save()
  serverTest = await createSchema()
})

afterAll(async () => {
  await connection.disconnect()
})

describe('Roles Unit Test', () => {
  test('Create a role', async () => {
    const testRole = { name: 'test' }
    isAdmin()
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
      'test',
    )

    expect(response.body.singleResult.errors).toBeUndefined()
  })
})
