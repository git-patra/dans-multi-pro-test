import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CONNECTION_NAME } from 'src/base/base.constants'
import { Responses } from 'src/helpers/response.helpers'
import { JobListController } from './infrastructure/job-list.controller'
import { HttpModule } from '@nestjs/common'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([], CONNECTION_NAME.MAIN_CONNECTION),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES }
    })
  ],
  controllers: [JobListController],
  providers: [Responses]
})
export class JobListModule {}
