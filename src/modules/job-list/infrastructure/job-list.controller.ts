import {
  BadRequestException,
  Controller,
  HttpStatus,
  UseGuards,
  Get,
  Query,
  Param
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard'
import { Responses } from 'src/helpers/response.helpers'
import { IResponses } from 'src/base/base.constants'
import { GetAxiosHelper } from '../../../helpers/get-axios.helper'
import { HttpService } from '@nestjs/common'
import { FilterJobListDto } from './dto/filter-job-list.dto'
import { IndexJobListManager } from '../domain/usescases/managers/index-job-list.manager'

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('job-lists')
@Controller('job-lists')
export class JobListController {
  constructor(private responses: Responses, public httpService: HttpService) {}

  @Get()
  async index(@Query() params: FilterJobListDto): Promise<IResponses> {
    try {
      return this.responses.json(
        HttpStatus.OK,
        await new IndexJobListManager(params, this.httpService).get()
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<IResponses> {
    try {
      return this.responses.json(
        HttpStatus.OK,
        await new GetAxiosHelper(
          'http://dev3.dansmultipro.co.id/api/recruitment/positions/:id',
          {},
          this.httpService,
          id
        ).get()
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
