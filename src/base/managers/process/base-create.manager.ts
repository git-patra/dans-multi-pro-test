import { BaseDataService } from '../../base-data.service'
import { STATUS } from '../../base.constants'
import { BaseManager } from '../base.manager'

export abstract class BaseCreateManager<Entity> extends BaseManager<Entity> {
  result: Entity

  constructor(
    private dataService: BaseDataService<Entity>,
    public entity: Entity
  ) {
    super()
  }

  async prepareData(): Promise<void> {
    Object.assign(this.entity, {
      status: STATUS.ACTIVE,
      created_id: !this.user?.id ? null : this.user.id
    })
  }

  async process(): Promise<void> {
    this.result = await this.dataService.create(this.entity)
  }

  async afterProcess(): Promise<void> {
    return
  }

  async getResult(): Promise<Entity> {
    return await this.dataService.getOneByOptions({
      where: { id: this.result['id'] }
    })
  }
}
