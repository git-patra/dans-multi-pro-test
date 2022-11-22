import { UsersEntity } from '../../domain/entities/users.entity'
import { UserRole } from '../../../../base/base.constants'

export const UserSeeder: Array<Partial<UsersEntity>> = [
  {
    name: 'admin',
    email: 'admin@dansmulti.pro',
    password: '123',
    role: UserRole.ADMIN
  }
]
