import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'
import { ServerMessage } from '../lib/socket'

export const getConvMessages = (
  id: number
): RequestReturnType<{ messages: ServerMessage[] }> => {
  return request.get('/message/conversation/' + id)
}
