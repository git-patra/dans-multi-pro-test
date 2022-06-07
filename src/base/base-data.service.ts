import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate'

export abstract class BaseDataService<Entity> {
  relations: string[]

  constructor(private repository: Repository<Entity>) {}

  getRepository(): Repository<Entity> {
    return this.repository
  }

  async create(entity: any): Promise<Entity> {
    return await this.repository.save(entity)
  }

  async update(id: string, entity: any, findOneOptions): Promise<Entity> {
    await this.repository.update(id, entity)

    return await this.getOneByOptions(findOneOptions)
  }

  async getIndex(
    options: IPaginationOptions,
    extraQuery: FindManyOptions<Entity> = null
  ): Promise<Pagination<Entity>> {
    if (extraQuery) {
      return paginate<Entity>(this.repository, options, extraQuery)
    }

    return paginate<Entity>(this.repository, options, {
      relations: this.relations
    })
  }

  async getOneByOptions(findOneOptions): Promise<Entity> {
    findOneOptions.relations = this.relations
    return await this.repository.findOne(findOneOptions)
  }

  async getOneOrFailByOptions(
    findOneOptions: FindOneOptions<Entity>
  ): Promise<Entity> {
    findOneOptions.relations = this.relations
    return await this.repository.findOneOrFail(findOneOptions)
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
