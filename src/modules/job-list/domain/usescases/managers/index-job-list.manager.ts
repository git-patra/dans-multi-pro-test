import { HttpService } from '@nestjs/common'
import { GetAxiosHelper } from '../../../../../helpers/get-axios.helper'
import { createPaginationObject } from 'nestjs-typeorm-paginate'
import { FilterJobListDto } from '../../../infrastructure/dto/filter-job-list.dto'

export class IndexJobListManager {
  constructor(
    public params: FilterJobListDto,
    public httpService: HttpService
  ) {}

  async get(): Promise<any> {
    const data = await new GetAxiosHelper(
      'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
      this.params,
      this.httpService
    ).get()

    return createPaginationObject<any>({
      items: data.slice(0, this.params.limit ?? 10),
      totalItems: data.length,
      currentPage: this.params.page,
      limit: this.params.limit,
      route: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json'
    })
  }
}
