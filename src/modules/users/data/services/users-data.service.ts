import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseDataService } from 'src/base/base-data.service'
import { CONNECTION_NAME } from 'src/base/base.constants'
import { Repository } from 'typeorm'
import { UsersEntity } from '../../domain/entities/users.entity'
import { Users } from '../models/users.model'
import { UserSeeder } from '../seeders/user.seeder'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersDataService extends BaseDataService<UsersEntity> {
  relations: string[] = []

  constructor(
    @InjectRepository(Users, CONNECTION_NAME.MAIN_CONNECTION)
    private usersRepo: Repository<Users>
  ) {
    super(usersRepo)
  }

  async onModuleInit(): Promise<void> {
    await this.seed()
  }

  async seed(): Promise<void> {
    const contactCount: number = await this.usersRepo.count()

    if (contactCount < 1) {
      await Promise.all(
        UserSeeder.map(async (seed: Partial<UsersEntity>) => {
          const hashedPassword = await bcrypt.hash(seed.password, 10)
          Object.assign(seed, { password: hashedPassword })
          await this.usersRepo.save(seed)
        })
      )
    }
  }
}
