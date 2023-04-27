interface UserInput {
  id: string
  username: string
  email: string
}

interface CreateUserArguments {
  username: string
  password: string
}

const createUser = (
  _parent: unknown,
  { username, password }: CreateUserArguments,
): UserInput => {
  console.error('username', username)
  console.error('password', password)
  if (username === '' || password === '') {
    return {
      id: '',
      email: '',
      username: '',
    }
  }

  return {
    id: '12345',
    email: 'gene@nasa.gov',
    username: 'gene',
  }
}

export default createUser
