import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator'
import { Match } from 'src/helpers/match-decorator'
import { UsersEntity } from '../../domain/entities/users.entity'
import { UserRole } from '../../../../base/base.constants'

export class CreateUsersDto implements UsersEntity {
  @ApiProperty({ type: 'string', required: true, example: 'patra' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: 'string', required: true, example: 'patra' })
  @IsString()
  password: string

  @ApiProperty({ type: 'string', required: true, example: 'patra' })
  @IsString()
  @Match('password', { message: 'Password and retype-password not match!' })
  retype_password: string

  @ApiProperty({ type: 'string', required: true, example: UserRole.USER })
  @IsIn(Object.values(UserRole))
  @IsNotEmpty()
  role: UserRole

  @ApiProperty({ type: 'string', required: true, example: 'patra@gmail.com' })
  @IsEmail()
  email: string
}
