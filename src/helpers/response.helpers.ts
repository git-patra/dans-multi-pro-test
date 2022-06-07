import { Injectable } from '@nestjs/common'
import { IResponses } from 'src/base/base.constants'

@Injectable()
export class Responses {
  public json(status: number, data: any = '', errors: any = ''): IResponses {
    return {
      statusCode: status,
      message: data,
      error: errors
    }
  }
}
