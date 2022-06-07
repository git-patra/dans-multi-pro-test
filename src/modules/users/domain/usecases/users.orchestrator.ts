import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { BatchResult, STATUS } from 'src/base/base.constants'
import { UsersDataService } from '../../data/services/users-data.service'
import { UsersEntity } from '../entities/users.entity'
import { UsersCreateManager } from './managers/users-create.manager'
import { UsersDeleteManager } from './managers/users-delete.manager'
import { UsersDetailManager } from './managers/users-detail.manager'
import { UsersLoginManager } from './managers/users-login.manager'
import { UsersUpdateManager } from './managers/users-update.manager'
import { UsersUpdatePasswordManager } from './managers/users-update-password.manager'
import { Pagination } from 'nestjs-typeorm-paginate'
import { Brackets, SelectQueryBuilder } from 'typeorm'
import { FilterUsersDto } from '../../infrastructure/dto/filter-users.dto'

@Injectable()
export class UsersOrchestrator {
  constructor(
    private usersDataService: UsersDataService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<UsersEntity> {
    const usersLoginManager = new UsersLoginManager(
      this.usersDataService,
      this.jwtService,
      email,
      password
    )
    await usersLoginManager.execute()
    return usersLoginManager.getResult()
  }

  async create(users: UsersEntity): Promise<UsersEntity> {
    const usersCreateManager = new UsersCreateManager(
      this.usersDataService,
      users
    )
    await usersCreateManager.execute()
    return await usersCreateManager.getResult()
  }

  async update(updatedData: UsersEntity, id: string): Promise<BatchResult> {
    const usersUpdateManager = new UsersUpdateManager(
      this.usersDataService,
      updatedData,
      id
    )
    await usersUpdateManager.execute()
    return usersUpdateManager.getResult()
  }

  async updatePassword(
    updatedData: Partial<UsersEntity>
  ): Promise<BatchResult> {
    const usersUpdateManager = new UsersUpdatePasswordManager(
      this.usersDataService,
      updatedData
    )
    await usersUpdateManager.execute()
    return usersUpdateManager.getResult()
  }

  async getDetail(id: string): Promise<UsersEntity> {
    const usersDetailManager = new UsersDetailManager(this.usersDataService, id)
    await usersDetailManager.execute()
    return usersDetailManager.getResult()
  }

  async deleteById(id: string): Promise<BatchResult> {
    const usersDeleteManager = new UsersDeleteManager(this.usersDataService, [
      id
    ])
    await usersDeleteManager.execute()
    return usersDeleteManager.getResult()
  }

  async index(params: FilterUsersDto): Promise<Pagination<UsersEntity>> {
    return await this.usersDataService.getIndex(
      {
        page: params.page,
        limit: params.limit,
        route: 'api/users'
      },
      {
        relations: this.usersDataService.relations,
        join: {
          alias: 'user'
        },
        where: (query: SelectQueryBuilder<UsersEntity>) => {
          if (params.q)
            query.where(
              new Brackets((qb) => {
                qb.where('user.name ilike =:search', {
                  search: `%${params.q}%`
                }).orWhere('user.email ilike =:search', {
                  search: `%${params.q}%`
                })
              })
            )
        },
        order: { created_at: 'DESC' }
      }
    )
  }
}
