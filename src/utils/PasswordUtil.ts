import bcrypt from 'bcryptjs'

export const encriptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash)
}
