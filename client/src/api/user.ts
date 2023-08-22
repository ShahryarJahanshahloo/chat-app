import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'
import { ApiNewUser } from './entities'

export const createUser = (
  user: ApiNewUser
): RequestReturnType<{ token: string }> => {
  return request.post('/user', user)
}

export const deleteUser = (): RequestReturnType<{}> => {
  return request.delete('/user')
}

export const updateUser = (updates: {}): RequestReturnType<{}> => {
  return request.patch('/user', updates)
}

export const login = (creds: {
  email: string
  password: string
}): RequestReturnType<{ token: string }> => {
  return request.post('/user/login', creds)
}
