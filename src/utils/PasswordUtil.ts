import bcrypt from 'bcryptjs'

export const encriptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  console.log(password)
  console.log(passwordHash)
  return await bcrypt.compare(password, passwordHash)
}
