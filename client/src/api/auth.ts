import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'
import { ApiUser } from './entities'

export const auth = (): RequestReturnType<ApiUser> => {
  return request.post('/user/auth')
}
