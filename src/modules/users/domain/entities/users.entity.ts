import { UserRole } from '../../../../base/base.constants'

export interface UsersEntity {
  id?: string
  name: string
  email: string
  role: UserRole
  password?: string
  created_at?: Date
  updated_at?: Date
}
