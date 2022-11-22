export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum TABLENAME {
  USERS = 'users'
}

export interface IResponses {
  statusCode: number
  message: any
  error: any
}

export enum CONNECTION_NAME {
  MAIN_CONNECTION = 'MAIN_CONNECTION'
}
