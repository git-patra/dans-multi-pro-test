import { UsersEntity } from '../../domain/entities/users.entity'

export class UserTransform {
  constructor(private userEntity: UsersEntity) {}

  transform(): UsersEntity {
    delete this.userEntity.password

    return this.userEntity
  }
}
