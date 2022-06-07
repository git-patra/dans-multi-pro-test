import { BaseGetByOptions } from 'src/base/managers/process/base-get-by-options.manager'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import { UsersEntity } from '../../entities/users.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export class UsersLoginManager extends BaseGetByOptions<UsersEntity> {
  constructor(
    public usersDataService: UsersDataService,
    public jwtService: JwtService,
    public email: string,
    public password: string
  ) {
    super(usersDataService)
  }

  async beforeProcess(): Promise<void> {
    return
  }

  async process(): Promise<void> {
    let findProperties = {}
    findProperties = this.setFindProperties()

    this.result = await this.baseDataService.getOneByOptions({
      where: findProperties
    })
    if (!this.result) this.handleErrorLogin()
  }

  async afterProcess(): Promise<void> {
    if (await bcrypt.compare(this.password, this.result.password)) {
      const payload: any = {
        id: this.result.id,
        name: this.result.name,
        email: this.result.email,
        role: this.result.role
      }

      this.result = payload

      Object.assign(this.result, {
        access_token: this.jwtService.sign(payload)
      })
      return
    }
    this.handleErrorLogin()
  }

  handleErrorLogin(): void {
    throw new Error('Combination email and password is wrong!')
  }

  setFindProperties(): any {
    return { email: this.email }
  }
}
