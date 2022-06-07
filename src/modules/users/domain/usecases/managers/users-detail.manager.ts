import { TABLENAME } from 'src/base/base.constants'
import { BaseGetByOptions } from 'src/base/managers/process/base-get-by-options.manager'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import { UsersEntity } from '../../entities/users.entity'

export class UsersDetailManager extends BaseGetByOptions<UsersEntity> {
  table_name = TABLENAME.USERS

  constructor(public usersDataService: UsersDataService, public id: string) {
    super(usersDataService)
  }

  async beforeProcess(): Promise<void> {
    return
  }

  async setFindProperties(): Promise<any> {
    return {
      where: { id: this.id }
    }
  }

  async afterProcess(): Promise<void> {
    return
  }
}
