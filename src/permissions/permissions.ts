import { rule, shield, allow, or } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info(
    'test use is authenticated middleware',
    ctx.user,
    'condition',
    ctx.user !== null,
  )

  return ctx.user !== null
})

export const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  console.info('is admin middleware', ctx.user)
  return ctx.user.roles.includes('admin')
})

export const permissions = shield(
  {
    // Query: {
    //   user: isAdmin,
    // users: isAdmin,
    // },
    Mutation: {
      createEmployee: allow,
      createCustomer: allow,
      createRole: isAdmin,
    },
  },
  {
    allowExternalErrors: true,
    debug: process.env.NODE_ENV !== 'production',
  },
)
