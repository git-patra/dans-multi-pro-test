import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateIf
} from 'class-validator'
import { BaseFilterEntity } from './base-filter.entity'
import { STATUS } from './base.constants'

export class BaseFilterDto implements BaseFilterEntity {
  @ApiProperty({ type: Number, required: false })
  @Transform((body) => Number(body.value))
  @ValidateIf((body) => body.page)
  @IsNumber()
  page = 1

  @ApiProperty({ type: Number, required: false })
  @Transform((body) => Number(body.value))
  @ValidateIf((body) => body.limit)
  @IsNumber()
  limit = 10

  @ApiProperty({ type: String, required: false })
  q: string
}
