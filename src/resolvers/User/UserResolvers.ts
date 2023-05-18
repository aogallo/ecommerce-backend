import { User } from '@entities/User/User'
import {
  Arg,
  Mutation,
  InputType,
  Query,
  Field,
  Resolver,
  Root,
  FieldResolver,
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Service } from 'typedi'
import { Roles } from '@entities/Roles/Roles'
import { ObjectId } from 'mongodb'

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

  @FieldResolver()
  async roles(@Root() user: User): Promise<Roles[]> {
    console.log('uer root', user)
    const id = user.roles[0]
    console.log(id)
    const rol = await this.rolesRepository.findOneById(id)

    console.log('rol', rol)
    const roles = await this.rolesRepository.findByIds(user.roles)

    console.log('roles', roles)

    return roles
  }

  @Query((returns) => [User], { nullable: 'itemsAndList' })
  async users(): Promise<User[]> {
    const users = await this.userRepository.find()
    console.log('user', users)
    return users
  }

  @Query((returns) => String)
  user(): string {
    return 'allan test resolver'
  }

  @Mutation((returns) => User)
  async createUser(@Arg('user') user: UserInput): Promise<User | undefined> {
    try {
      console.log('data', user)
      const newUser = this.userRepository.create(user)
      // const newRole = this.rolesRepository.create({ name: 'admin' })
      // const role = await this.rolesRepository.save(newRole)
      // console.log('role', role.id)
      newUser.roles = [new ObjectId('6465a3d9180e9d9443d07ff9')]
      return await Promise.resolve(this.userRepository.save(newUser))
    } catch (error) {
      console.log('erro', error)
    }
  }
}
