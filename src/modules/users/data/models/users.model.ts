import { STATUS, TABLENAME, UserRole } from 'src/base/base.constants'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { UsersEntity } from '../../domain/entities/users.entity'

@Entity(TABLENAME.USERS)
export class Users implements UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('text', { name: 'name', nullable: false })
  name: string

  @Column('varchar', { name: 'email', length: 255, nullable: true })
  email: string

  @Column('enum', { name: 'role', enum: UserRole, nullable: true })
  role: UserRole

  @Column('varchar', { name: 'password', length: 255, nullable: true })
  password: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
