import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import * as bcrypt from 'bcrypt'

import { UsersEntity } from '../../entities/users.entity'

export class UsersCreateManager {
  result: UsersEntity

  constructor(
    private usersDataService: UsersDataService,
    private usersEntity: UsersEntity
  ) {}

  async execute(): Promise<UsersEntity> {
    try {
      await this.beforeProcess()
      await this.process()

      return this.result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async beforeProcess(): Promise<void> {
    if (await this.validateUserByEmail())
      throw new Error('Email already exists!')

    const salt = 10

    this.usersEntity.password = await bcrypt.hash(
      this.usersEntity.password,
      salt
    )
  }

  async process(): Promise<void> {
    this.result = await this.usersDataService.create(this.usersEntity)
  }

  async validateUserByEmail(): Promise<boolean> {
    const checkUsers = await this.usersDataService.getOneByOptions({
      where: { email: this.usersEntity.email }
    })

    return !!checkUsers
  }
}
