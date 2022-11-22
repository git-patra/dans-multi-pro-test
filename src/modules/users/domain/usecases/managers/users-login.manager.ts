import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersEntity } from '../../entities/users.entity'

export class UsersLoginManager {
  result: UsersEntity

  constructor(
    public usersDataService: UsersDataService,
    public jwtService: JwtService,
    public email: string,
    public password: string
  ) {}

  async execute(): Promise<UsersEntity> {
    await this.process()
    await this.afterProcess()

    return this.result
  }

  async process(): Promise<void> {
    this.result = await this.usersDataService.getOneByOptions({
      where: { email: this.email }
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
}
