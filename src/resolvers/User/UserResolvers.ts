import { User } from '@entities/User/User'
import { Arg, Mutation, InputType, Query, Field, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Service } from 'typedi'
import { Roles } from '@entities/Roles/Roles'

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
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  @Query((returns) => String)
  user(): string {
    return 'allan test resolver'
  }

  @Mutation((returns) => User)
  async createUser(@Arg('user') user: UserInput): Promise<User | undefined> {
    try {
      console.log('data', user)
      const newUser = this.userRepository.create(user)
      const newRole = this.rolesRepository.create({ name: 'admin' })
      const role = await this.rolesRepository.save(newRole)
      newUser.roles = []
      console.log('role', role.id)
      return await Promise.resolve(this.userRepository.save(newUser))
    } catch (error) {
      console.log('erro', error)
    }
  }
}
