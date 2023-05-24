import { Field, InputType } from 'type-graphql'

import type { Role } from '@entities/Roles/Roles'

@InputType()
export class RoleInput implements Partial<Role> {
  @Field()
  name!: string
}
