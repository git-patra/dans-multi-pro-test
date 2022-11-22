import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersDataService } from '../../data/services/users-data.service'
import { UsersEntity } from '../entities/users.entity'
import { UsersCreateManager } from './managers/users-create.manager'
import { UsersLoginManager } from './managers/users-login.manager'

@Injectable()
export class UsersOrchestrator {
  constructor(
    private usersDataService: UsersDataService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<UsersEntity> {
    return await new UsersLoginManager(
      this.usersDataService,
      this.jwtService,
      email,
      password
    ).execute()
  }

  async create(users: UsersEntity): Promise<UsersEntity> {
    return await new UsersCreateManager(this.usersDataService, users).execute()
  }
}
