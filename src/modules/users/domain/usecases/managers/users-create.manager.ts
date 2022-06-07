import { BaseCreateManager } from 'src/base/managers/process/base-create.manager'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import * as bcrypt from 'bcrypt'

import { UsersEntity } from '../../entities/users.entity'

export class UsersCreateManager extends BaseCreateManager<UsersEntity> {
  constructor(
    private usersDataService: UsersDataService,
    private usersEntity: UsersEntity
  ) {
    super(usersDataService, usersEntity)
  }

  async beforeProcess(): Promise<void> {
    if (await this.validateUserByEmail())
      throw new Error('Email already exists!')

    const salt = 10

    this.entity.password = await bcrypt.hash(this.entity.password, salt)
  }

  async validateUserByEmail(): Promise<boolean> {
    const checkUsers = await this.usersDataService.getOneByOptions({
      where: { email: this.entity.email }
    })
    return !!checkUsers
  }
}
