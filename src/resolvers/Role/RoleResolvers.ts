import { Arg, Mutation, Resolver } from 'type-graphql'

import { Role, RoleModel } from '@entities/Roles/Roles'
import { RoleInput } from '@resolvers/types/RoleTypes'

@Resolver(() => Role)
export default class RoleResolvers {
  @Mutation(() => Role)
  async createRole(@Arg('role') role: RoleInput): Promise<Role> {
    return await new RoleModel(role).save()
  }
}
