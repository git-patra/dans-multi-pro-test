import { UsersEntity } from '../../domain/entities/users.entity'

export class UsersTransformer {
  constructor(private users: UsersEntity[]) {}

  transform(): UsersEntity[] {
    return this.users.map((user) => {
      delete user.password

      return user
    })
  }
}
