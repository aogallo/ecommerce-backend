import getUserById from './queries/getUserById'

const UserResolvers = {
  Query: {
    getUserById,
  },
}

export default UserResolvers
