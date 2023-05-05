interface UserInput {
  id: string
  username: string
  email: string
}

const getUserById = (_parent: any, args: any, ctx: any): UserInput => {
  return {
    id: '111',
    username: 'aogallo',
    email: 'test@gmail.com',
  }
}

export default getUserById
