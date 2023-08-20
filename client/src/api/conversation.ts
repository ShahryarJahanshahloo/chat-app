import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'
import { ApiConvSearch } from './entities'

export const searchConvs = (
  query: string
): RequestReturnType<ApiConvSearch[]> => {
  return request.get('/conversation/' + query)
}

export const createConv = (conv: {
  name: string
}): RequestReturnType<ApiConvSearch[]> => {
  return request.post('/conversation/' + conv)
}

export const deleteConv = (id: number): RequestReturnType<ApiConvSearch[]> => {
  return request.delete('/conversation/' + { id })
}

export const leaveConv = (id: number): RequestReturnType<ApiConvSearch[]> => {
  return request.post('/conversation/leave' + { id })
}

export const joinConv = (
  conversation: number
): RequestReturnType<ApiConvSearch[]> => {
  return request.post('/conversation/join' + { conversation })
}
