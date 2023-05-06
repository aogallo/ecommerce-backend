import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  BaseEntity,
} from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @ObjectIdColumn()
  id!: ObjectId

  @Field()
  @Column()
  username!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  email!: string

  @Column()
  password!: string

  @Field()
  @CreateDateColumn({ type: 'datetime' })
  createAt!: string

  @Field()
  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: string

  // constructor(username: string, name: string, email: string, password: string) {
  //   this.password = password
  //   this.name = name
  //   this.email = email
  //   this.username = username
  // }
}
