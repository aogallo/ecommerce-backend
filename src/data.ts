export const users = [
  {
    id: '12345',
    name: 'Gene Kranz',
    email: 'gene@nasa.gov',
    username: 'gene',
    password: 'password123!',
    roles: ['director'],
    permissions: ['read:any_user', 'read:own_user'],
  },
  {
    id: '67890',
    name: 'Neil Armstrong',
    email: 'neil@nasa.gov',
    username: 'neil',
    password: 'password890!',
    roles: ['astronaut'],
    permissions: ['read:own_user'],
  },
]
