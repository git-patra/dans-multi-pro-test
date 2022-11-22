import { ApiProperty } from '@nestjs/swagger'
import { ValidateIf } from 'class-validator'
import { Transform } from 'class-transformer'

export class FilterJobListDto {
  @ValidateIf((body) => body.page)
  @ApiProperty({
    required: false,
    description: 'Page'
  })
  @Transform(({ value }) => {
    return value ? Number(value) : value
  })
  page: number

  @ValidateIf((body) => body.limit)
  @ApiProperty({
    required: false,
    description: 'Page'
  })
  @Transform(({ value }) => {
    return value ? Number(value) : value
  })
  limit: number

  @ValidateIf((body) => body.description)
  @ApiProperty({
    required: false,
    description: 'Search Description'
  })
  description: string

  @ValidateIf((body) => body.location)
  @ApiProperty({
    required: false,
    description: 'Search Description'
  })
  location: string

  @ValidateIf((body) => body.full_time)
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Search Description'
  })
  @Transform(({ value }) => {
    return value ? JSON.parse(value) : value
  })
  full_time: string
}
