import { HttpService } from '@nestjs/common'

export class GetAxiosHelper {
  constructor(
    public url: string,
    public params: any,
    public httpService: HttpService,
    public id: string = null
  ) {}

  async get(): Promise<any> {
    if (this.id) this.url = this.url.replace(':id', this.id)

    try {
      return (
        await this.httpService
          .get(this.url, {
            params: this.params
          })
          .toPromise()
      ).data
    } catch (e) {
      console.log(this.url, e)
      throw Error(e)
    }
  }
}
