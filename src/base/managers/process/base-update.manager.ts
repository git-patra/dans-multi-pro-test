import { BatchResult } from 'src/base/base.constants'
import { BaseDataService } from '../../base-data.service'
import { BaseManager } from '../base.manager'

export abstract class BaseUpdateManager<Entity> extends BaseManager<Entity> {
  result: BatchResult = {
    success: [],
    failed: []
  }

  constructor(
    private dataService: BaseDataService<Entity>,
    public updatedData: Entity | Partial<Entity>,
    public id: string = null
  ) {
    super()
  }

  async prepareData(): Promise<void> {
    this.id = this.id ?? this.user.id
  }

  async process(): Promise<void> {
    let entity: Entity
    try {
      entity = await this.dataService.getOneByOptions({
        where: { id: this.id }
      })
      if (!!entity) {
        if (await this.validateProcess(entity)) {
          await this.dataService.update(this.id, this.updatedData, {
            where: { id: this.id }
          })
          this.result.success.push(await this.setSuccessMessage(entity))
        } else {
          this.result.failed.push(await this.setFailedMessage(entity))
        }
      } else {
        this.result.failed.push(await this.setFailedMessage({ id: this.id }))
      }
    } catch (err) {
      this.result.failed.push(err.message)
    }
  }

  abstract validateProcess(entity: Entity): Promise<boolean>

  abstract setSuccessMessage(entity: Entity): Promise<any>

  async setFailedMessage(entity): Promise<any> {
    return `Data with id: "${entity.id}" fail to update data!`
  }

  getResult(): BatchResult {
    return this.result
  }
}
