import { UsersEntity } from '../../domain/entities/users.entity'
import { UserRole } from '../../../../base/base.constants'

export const UserSeeder: Array<Partial<UsersEntity>> = [
  {
    name: 'admin',
    email: 'admin@primaku.com',
    password: '#Admin123',
    role: UserRole.ADMIN
  }
]
