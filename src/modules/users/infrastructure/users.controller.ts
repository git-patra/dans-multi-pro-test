import {
  BadRequestException,
  Body,
  Controller,
  Post,
  HttpStatus,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateUsersDto } from './dto/create-users.dto'
import { UsersOrchestrator } from '../domain/usecases/users.orchestrator'
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard'
import { Responses } from 'src/helpers/response.helpers'
import { IResponses } from 'src/base/base.constants'
import { LoginUsersDto } from './dto/login-users.dto'
import { UserTransform } from './transformer/user.transform'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private responses: Responses,
    private usersOrchestrator: UsersOrchestrator
  ) {}

  @Post('login')
  async login(@Body() loginUsersDto: LoginUsersDto): Promise<IResponses> {
    try {
      const result = await this.usersOrchestrator.login(
        loginUsersDto.email,
        loginUsersDto.password
      )
      return this.responses.json(HttpStatus.OK, result)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post()
  async create(@Body() createUsersDto: CreateUsersDto): Promise<IResponses> {
    try {
      delete createUsersDto.retype_password

      const result: any = await this.usersOrchestrator.create(createUsersDto)
      return this.responses.json(
        HttpStatus.OK,
        new UserTransform(result).transform()
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
