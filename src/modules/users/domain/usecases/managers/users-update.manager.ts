import * as bcrypt from 'bcrypt'
import { Users } from 'src/modules/users/data/models/users.model'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import { UsersEntity } from '../../entities/users.entity'
import { BaseUpdateManager } from 'src/base/managers/process/base-update.manager'

export class UsersUpdateManager extends BaseUpdateManager<UsersEntity> {
  constructor(
    private usersDataService: UsersDataService,
    private updateData: UsersEntity,
    private idUser: string
  ) {
    super(usersDataService, updateData, idUser)
  }

  async beforeProcess(): Promise<void> {
    return
  }

  async validateProcess(entity: UsersEntity): Promise<boolean> {
    await this.validateUserByEmail(entity)

    return true
  }

  async setSuccessMessage(entity: UsersEntity): Promise<any> {
    return `User: ${entity.name} success to update data.`
  }

  async setFailedMessage(entity: UsersEntity): Promise<any> {
    return `User: ${entity.name} fail to update data!`
  }

  async afterProcess(): Promise<void> {
    return
  }

  async validateUserByEmail(entity: UsersEntity): Promise<boolean> {
    const checkUsers = await this.usersDataService.getOneByOptions({
      where: { email: entity.email }
    })
    if (!!checkUsers) return true
    throw new Error(`This email address: ${entity.email} already use!`)
  }
}
