import { IUserSingleton, Singleton } from 'src/helpers/singleton'
import { UserRole } from '../base.constants'

export abstract class BaseManager<Entity> {
  user: IUserSingleton

  constructor() {
    const singleton = Singleton.getInstance()
    this.user = singleton.getUser()
  }

  async execute(): Promise<void> {
    try {
      await this.prepareData()
      await this.beforeProcess()
      await this.process()
      await this.afterProcess()
    } catch (e) {
      throw new Error(e.message)
    }
  }

  abstract prepareData(): Promise<void>

  abstract beforeProcess(): Promise<void>

  abstract process(): Promise<void>

  abstract afterProcess(): Promise<void>

  async validateActionByRole(): Promise<boolean> {
    if (this.user.role !== UserRole.ADMIN)
      throw new Error(`Only admin can perform this action!`)

    return true
  }
}
