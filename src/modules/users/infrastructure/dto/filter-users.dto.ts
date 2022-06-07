import { BaseFilterDto } from 'src/base/base-filter.dto'
import { FilterUsersEntity } from '../../domain/entities/filter-users.entity'

export class FilterUsersDto
  extends BaseFilterDto
  implements FilterUsersEntity {}
