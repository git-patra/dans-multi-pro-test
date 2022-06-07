import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginUsersDto {
  @ApiProperty({ type: 'string', required: true, example: 'admin@primaku.com' })
  @IsEmail()
  email: string

  @ApiProperty({ type: 'string', required: true, example: '#Admin123' })
  @IsString()
  password: string
}
