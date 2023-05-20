import { Arg, Mutation, Resolver } from 'type-graphql'

import { Role, RoleModel } from '@entities/Roles/Roles'
import { RoleInput } from '@resolvers/types/RoleTypes'

@Resolver((of) => Role)
export default class RoleResolvers {
  @Mutation((returns) => Role)
  async createRole(@Arg('role') role: RoleInput): Promise<Role> {
    return await new RoleModel(role).save()
  }
}
