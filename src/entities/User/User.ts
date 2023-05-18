import { Roles } from '@entities/Roles/Roles'
import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectId,
  Entity,
  ObjectIdColumn,
} from 'typeorm'

@ObjectType()
@Entity('users')
export class User {
  @Field((type) => ID)
  @ObjectIdColumn()
  readonly id!: ObjectId

  @Field()
  @Column('text', { unique: true })
  username!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column('text', { unique: true })
  email!: string

  @Column()
  password!: string

  @Field((type) => [Roles])
  @Column((type) => ObjectId)
  @Field((type) => [Roles], { nullable: true })
  @Column({ array: true })
  roles!: ObjectId[]

  @Field()
  @CreateDateColumn({ type: 'datetime' })
  createAt!: string

  @Field()
  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: string
}
