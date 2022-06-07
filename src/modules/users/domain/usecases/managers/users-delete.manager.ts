import { BaseDeleteManager } from 'src/base/managers/process/base-delete.manager'
import { Users } from 'src/modules/users/data/models/users.model'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import { UsersEntity } from '../../entities/users.entity'
import { UserRole } from '../../../../../base/base.constants'

export class UsersDeleteManager extends BaseDeleteManager<UsersEntity> {
  constructor(
    private usersDataService: UsersDataService,
    private idUser: string[]
  ) {
    super(usersDataService, Users, idUser)
  }

  async beforeProcess(): Promise<void> {
    return
  }

  prepareData(): Promise<void> {
    return
  }

  async validateProcess(entity: UsersEntity): Promise<boolean> {
    await this.validateActionByRole()

    return true
  }

  async setSuccessMessage(entity: UsersEntity): Promise<string> {
    return `Data user: ${entity.name} success to delete.`
  }

  async setFailedMessage(entity: any): Promise<string> {
    return `Data user: ${!entity.name ?? entity.id} fail to delete!`
  }

  async afterProcess(): Promise<void> {
    return
  }
}
