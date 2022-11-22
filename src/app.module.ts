import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { Users } from './modules/users/data/models/users.model'
import { UsersModule } from './modules/users/users.module'
import { JwtStrategy } from './base/auth/jwt.strategy'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { CONNECTION_NAME } from './base/base.constants'
import { JobListModule } from './modules/job-list/job-list.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      name: CONNECTION_NAME.MAIN_CONNECTION,
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Users],
      synchronize: process.env.MODE === 'development'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    }),
    UsersModule,
    JobListModule
  ],
  controllers: [],
  providers: [JwtStrategy]
})
export class AppModule {}
