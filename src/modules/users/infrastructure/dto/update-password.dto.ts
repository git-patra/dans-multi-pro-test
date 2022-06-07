import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Match } from '../../../../helpers/match-decorator'

export class UpdatePasswordDto {
  @ApiProperty({ type: 'string', required: true, example: 'q1' })
  @IsString()
  password: string

  @ApiProperty({ type: 'string', required: true, example: 'q1' })
  @IsString()
  @Match('password', { message: 'Password and retype-password not match!' })
  retype_password: string
}
