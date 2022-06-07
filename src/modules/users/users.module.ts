import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CONNECTION_NAME } from 'src/base/base.constants'
import { Responses } from 'src/helpers/response.helpers'
import { Users } from './data/models/users.model'
import { UsersDataService } from './data/services/users-data.service'
import { UsersOrchestrator } from './domain/usecases/users.orchestrator'
import { UsersController } from './infrastructure/users.controller'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Users], CONNECTION_NAME.MAIN_CONNECTION),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES }
    })
  ],
  controllers: [UsersController],
  providers: [Responses, UsersOrchestrator, UsersDataService]
})
export class UsersModule {}
