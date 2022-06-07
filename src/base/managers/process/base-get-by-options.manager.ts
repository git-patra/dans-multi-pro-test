import { BaseDataService } from '../../base-data.service'
import { BaseReadManager } from '../base-read.manager'

export abstract class BaseGetByOptions<Entity> extends BaseReadManager {
  result: Entity

  constructor(public baseDataService: BaseDataService<Entity>) {
    super()
  }

  abstract beforeProcess(): Promise<void>

  async process(): Promise<void> {
    let findProperties = {}
    findProperties = await this.setFindProperties()

    this.result = await this.baseDataService.getOneOrFailByOptions(
      findProperties
    )
  }

  abstract setFindProperties(): Promise<any>

  abstract afterProcess(): Promise<void>

  getResult(): Entity {
    return this.result
  }
}
