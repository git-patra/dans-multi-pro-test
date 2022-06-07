import { BatchResult } from 'src/base/base.constants'
import { EntityTarget } from 'typeorm'
import { BaseDataService } from '../../base-data.service'
import { BaseManager } from '../base.manager'

export abstract class BaseDeleteManager<Entity> extends BaseManager<Entity> {
  result: BatchResult = {
    success: [],
    failed: []
  }

  constructor(
    private dataService: BaseDataService<Entity>,
    private entityTarget: EntityTarget<Entity>,
    private ids: string[]
  ) {
    super()
  }

  async process(): Promise<void> {
    for (const id of this.ids) {
      let entity: Entity
      try {
        entity = await this.dataService.getOneByOptions({ where: { id } })
        if (!!entity) {
          if (await this.validateProcess(entity)) {
            await this.dataService.deleteById(id)
            this.result.success.push(await this.setSuccessMessage(entity))
          } else {
            this.result.failed.push(await this.setFailedMessage(entity))
          }
        } else {
          this.result.failed.push(await this.setFailedMessage({ id }))
        }
      } catch (err) {
        this.result.failed.push(err.message)
      }
    }
  }

  abstract validateProcess(entity: Entity): Promise<boolean>

  abstract setSuccessMessage(entity: Entity): Promise<string>

  async setFailedMessage(entity): Promise<string> {
    return `Data with id: "${entity.id}" fail to delete!`
  }

  getResult(): BatchResult {
    return this.result
  }
}
