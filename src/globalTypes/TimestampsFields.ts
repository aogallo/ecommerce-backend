import { Field, GraphQLISODateTime, ObjectType } from 'type-graphql'

@ObjectType()
export default class TimestampsFields {
  @Field((type) => GraphQLISODateTime)
  createdAt!: string

  @Field((type) => GraphQLISODateTime)
  updatedAt!: string
}
