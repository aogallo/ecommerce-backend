import { User } from '@entities/User/User'
import { Arg, Mutation, InputType, Query, Field, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Service } from 'typedi'

@InputType()
class UserInput implements Partial<User> {
  @Field()
  username!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@Service()
@Resolver((of) => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query((returns) => String)
  user(): string {
    return 'allan test resolver'
  }

  @Mutation((returns) => User)
  async createUser(@Arg('user') user: UserInput): Promise<User> {
    console.log('data', user)
    const newUser = this.userRepository.create(user)
    return await this.userRepository.save(newUser)
  }
}
