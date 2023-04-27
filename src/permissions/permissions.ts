import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info('is authenticated middleware', ctx.user)
  return ctx.user !== null
})

const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info('is admin middleware', ctx.user)
  return ctx.user.roles.includes('admin')
})

export const permissions = shield({
  Query: {
    getUserById: isAuthenticated,
  },
  Mutation: {
    createUser: isAdmin,
  },
})
