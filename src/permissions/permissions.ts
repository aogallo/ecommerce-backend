import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info('middleware', ctx.user)
  return ctx.user !== null
})

const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  return ctx.user.role.includes('admin')
})

export const permissions = shield({
  Query: {
    getUserById: isAuthenticated,
  },
})
