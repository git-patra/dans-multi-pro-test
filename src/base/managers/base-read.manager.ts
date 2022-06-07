import { IUserSingleton, Singleton } from 'src/helpers/singleton'

export abstract class BaseReadManager {
  user: IUserSingleton
  table_name: string

  constructor() {
    const singleton = Singleton.getInstance()
    this.user = singleton.getUser()
  }

  async execute(): Promise<void> {
    await this.beforeProcess()
    await this.process()
    await this.afterProcess()
  }

  abstract beforeProcess(): Promise<void>

  abstract process(): Promise<void>

  abstract afterProcess(): Promise<void>
}
