import { type Resolvers } from 'src/generated/graphql'
import getUserById from './queries/getUserById'

const UserResolvers: Resolvers = {
  Query: {
    getUserById,
  },
}

export default UserResolvers
