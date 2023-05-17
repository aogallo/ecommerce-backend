import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity('roles')
export class Roles {
  @Field((type) => ID)
  @ObjectIdColumn()
  id!: ObjectId

  @Field()
  @Column({ unique: true })
  name!: string

  @Field()
  @CreateDateColumn({ type: 'datetime' })
  createAt!: string

  @Field()
  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date
}
