import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'
import { ApiNewUser } from './entities'

export const createUser = (user: ApiNewUser): RequestReturnType<{}> => {
  return request.post('/user')
}

export const deleteUser = (): RequestReturnType<{}> => {
  return request.delete('/user')
}
//needs live event

export const updateUser = (updates: {}): RequestReturnType<{}> => {
  return request.patch('/user')
}
//needs live event

export const login = (creds: {
  email: string
  password: string
}): RequestReturnType<{ token: string }> => {
  return request.post('/user/login', creds)
}
