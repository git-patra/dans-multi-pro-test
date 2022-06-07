import * as bcrypt from 'bcrypt'
import { Users } from 'src/modules/users/data/models/users.model'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import { UsersEntity } from '../../entities/users.entity'
import { BaseUpdateManager } from 'src/base/managers/process/base-update.manager'

export class UsersUpdatePasswordManager extends BaseUpdateManager<UsersEntity> {
  constructor(
    private usersDataService: UsersDataService,
    private updateData: Partial<UsersEntity>
  ) {
    super(usersDataService, updateData)
  }

  async beforeProcess(): Promise<void> {
    if (this.updatedData.password) {
      const salt = 10

      this.updatedData.password = await bcrypt.hash(
        this.updatedData.password,
        salt
      )
    }

    return
  }

  async validateProcess(entity: UsersEntity): Promise<boolean> {
    return true
  }

  async setSuccessMessage(entity: UsersEntity): Promise<any> {
    return `Password has been changed.`
  }

  async setFailedMessage(entity: UsersEntity): Promise<any> {
    return `Password failed to changed.`
  }

  async afterProcess(): Promise<void> {
    return
  }
}
