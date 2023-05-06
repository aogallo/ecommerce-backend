import { not, rule, shield, allow } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info(
    'test use is authenticated middleware',
    ctx.user,
    'condition',
    ctx.user !== null,
  )

  // return ctx.user !== null
  return true
})

const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info('is admin middleware', ctx.user)
  return ctx.user.roles.includes('admin')
})

export const permissions = shield(
  {
    Query: {
      // getUserById: isAuthenticated,
      user: isAuthenticated,
    },
    Mutation: {
      createUser: allow,
    },
  },
  {
    allowExternalErrors: true,
    // debug: process.env.NODE_ENV !== 'production' ? true : false,
    debug: true,
  },
)
