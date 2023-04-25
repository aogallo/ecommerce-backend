interface UserInput {
  id: string
  username: string
  email: string
}

const getUserById = (): UserInput => ({
  id: '111',
  username: 'aogallo',
  email: 'test@gmail.com',
})

export default getUserById
