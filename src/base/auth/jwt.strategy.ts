import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Singleton } from 'src/helpers/singleton'
import { UsersDataService } from 'src/modules/users/data/services/users-data.service'
import { ModuleRef } from '@nestjs/core'
import { STATUS } from '../base.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any) {
    const singleton = Singleton.getInstance()

    const user = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role
    }

    singleton.set({
      user
    })

    return user
  }
}
