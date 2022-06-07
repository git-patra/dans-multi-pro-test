import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  ValidateIf
} from 'class-validator'
import { UsersEntity } from '../../domain/entities/users.entity'
import { UserRole } from '../../../../base/base.constants'

export class UpdateUsersDto implements UsersEntity {
  @ApiProperty({ type: 'string', required: true, example: 'patra' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: 'string', required: true, example: 'patra@gmail.com' })
  @ValidateIf((body) => body.email)
  @IsEmail()
  email: string

  @ApiProperty({ type: 'string', required: true, example: UserRole.USER })
  @IsIn(Object.values(UserRole))
  @IsNotEmpty()
  role: UserRole
}
