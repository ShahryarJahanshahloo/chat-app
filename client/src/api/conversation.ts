import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'
import { ApiConvSearch } from './entities'

export const searchConvs = (
  query: string
): RequestReturnType<{ conversations: ApiConvSearch[]; query: string }> => {
  return request.get('/conversation/search?query=' + query)
}

export const createConv = (conv: {
  name: string
}): RequestReturnType<ApiConvSearch[]> => {
  return request.post('/conversation/' + conv)
}

export const deleteConv = (id: number): RequestReturnType<ApiConvSearch[]> => {
  return request.delete('/conversation/' + { id })
}
//needs event

export const leaveConv = (id: number): RequestReturnType<ApiConvSearch[]> => {
  return request.post('/conversation/leave' + { id })
}

export const joinConv = (
  conversation: number
): RequestReturnType<ApiConvSearch[]> => {
  return request.post('/conversation/join' + { conversation })
}

export const getConvMembers = (
  id: number
): RequestReturnType<ApiConvSearch[]> => {
  return request.get('/conversation/' + id + '/members')
}
