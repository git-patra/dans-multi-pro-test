import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginUsersDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'admin@dansmulti.pro'
  })
  @IsEmail()
  email: string

  @ApiProperty({ type: 'string', required: true, example: '123' })
  @IsString()
  password: string
}
