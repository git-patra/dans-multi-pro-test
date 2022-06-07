export enum RESULT {
  SUCCESS = 'success',
  FAILED = 'failed'
}

export enum STATUS {
  ACTIVE = 'Active',
  NON_ACTIVE = 'Non Active'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum OPERATION {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ACTIVATE = 'activate',
  INACTIVATE = 'inactivate'
}

export enum TABLENAME {
  USERS = 'users'
}

export interface BatchResult {
  success: string[]
  failed: string[]
}

export interface IResponses {
  statusCode: number
  message: any
  error: any
}

export enum CONNECTION_NAME {
  MAIN_CONNECTION = 'MAIN_CONNECTION'
}
