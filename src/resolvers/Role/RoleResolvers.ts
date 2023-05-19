import { Arg, Mutation } from 'type-graphql'

import { Role, RoleModel } from '@entities/Roles/Roles'
import { RoleInput } from '@resolvers/types/RoleTypes'

export default class RoleResolvers {
  @Mutation((returns) => Role)
  async createRole(@Arg('role') role: RoleInput): Promise<Role> {
    const newRole = await new RoleModel(role).save()
    console.log('new role', newRole)
    return newRole
  }
}
