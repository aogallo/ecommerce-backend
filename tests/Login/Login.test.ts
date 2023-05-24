import { type ApolloServer } from '@apollo/server'
import { type MyContext, createSchema } from '@src/server'
import { connect, type Mongoose } from 'mongoose'
import type { GraphQLResponseTest } from '../CommonTestTypes/CommonTestTypes'
import { RoleModel } from '@entities/Roles/Roles'
import { graphql } from 'graphql'
import { UserModel } from '@entities/User/User'
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

  const user = await UserModel.create({ ...userInput, roles: [roleTest.id] })
  await user.save()

  serverTest = await createSchema()
})

afterAll(async () => {
  await connection.disconnect()
})

describe('Login Unit Test', () => {
  const loginMutation = `
    mutation Login($login: LoginInput!) {
      login(login: $login) {
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
        token
      }
    }
  `

  test('Login falied with wrong credentials', async () => {
    const login = { username: 'test', password: '1' }
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: loginMutation,
      variables: { login },
    })) as GraphQLResponseTest

    expect(response.body.singleResult.data).toBeNull()
    const errors = response.body.singleResult.errors

    if (errors != null || errors !== undefined) {
      expect(errors[0]).toHaveProperty(
        'message',
        'Usuario o contraseña incorrectos',
      )
    }
  })

  test('Login into application', async () => {
    const login = { username: 'test', password: 'testpassword' }
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: loginMutation,
      variables: { login },
    })) as GraphQLResponseTest

    const data = response.body.singleResult.data
    expect(response.body.singleResult.errors).toBeUndefined()

    if (data != null || data !== undefined) {
      expect(data).toHaveProperty('login.token')
    }
  })

  test('Login failed undefined user', async () => {
    const login = { username: 'testa', password: 'testpassword' }
    const response: GraphQLResponseTest = (await serverTest.executeOperation({
      query: loginMutation,
      variables: { login },
    })) as GraphQLResponseTest

    const errors = response.body.singleResult.errors
    expect(response.body.singleResult.data).toBeNull()

    if (errors != null || errors !== undefined) {
      expect(errors[0]).toHaveProperty(
        'message',
        'Usuario o contraseña incorrectos',
      )
    }
  })
})
