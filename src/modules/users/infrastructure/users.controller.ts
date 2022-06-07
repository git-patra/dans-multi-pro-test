import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  UseGuards,
  Patch,
  Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateUsersDto } from './dto/create-users.dto'
import { UsersOrchestrator } from '../domain/usecases/users.orchestrator'
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard'
import { UpdateUsersDto } from './dto/update-users.dto'
import { Responses } from 'src/helpers/response.helpers'
import { IResponses } from 'src/base/base.constants'
import { LoginUsersDto } from './dto/login-users.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { FilterUsersDto } from './dto/filter-users.dto'
import { UserTransform } from './transformer/user.transform'
import { UsersTransformer } from './transformer/users.transform'

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get()
  async index(@Query() params: FilterUsersDto): Promise<IResponses> {
    try {
      const result: any = await this.usersOrchestrator.index(params)
      const transformResult = {
        items: new UsersTransformer(result.items).transform(),
        meta: result['meta']
      }
      return this.responses.json(HttpStatus.OK, transformResult)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Put('password')
  async updatePassword(
    @Body() updatedData: UpdatePasswordDto
  ): Promise<IResponses> {
    try {
      delete updatedData.retype_password

      const result: any = await this.usersOrchestrator.updatePassword(
        updatedData
      )
      return this.responses.json(HttpStatus.OK, result)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedData: UpdateUsersDto
  ): Promise<IResponses> {
    try {
      const result: any = await this.usersOrchestrator.update(updatedData, id)
      return this.responses.json(HttpStatus.OK, result)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getDetail(@Param('id') id: string): Promise<IResponses> {
    try {
      const result: any = await this.usersOrchestrator.getDetail(id)
      return this.responses.json(
        HttpStatus.OK,
        new UserTransform(result).transform()
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<IResponses> {
    try {
      const result = await this.usersOrchestrator.deleteById(id)
      return this.responses.json(HttpStatus.OK, result)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
