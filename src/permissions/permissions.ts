import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info('middleware', ctx.user)
  return ctx.user !== null
})

export const permissions = shield({
  Query: {
    getUserById: isAuthenticated,
  },
})
