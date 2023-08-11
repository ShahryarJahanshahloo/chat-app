import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'

export const auth = (): RequestReturnType<{ userId: number }> => {
  return request.post('/user/auth')
}
