import getUserById from './queries/getUserById'
import createUser from './mutations/createUser'

const UserResolvers = {
  Query: {
    getUserById,
  },
  Mutation: {
    createUser,
  },
}

export default UserResolvers
