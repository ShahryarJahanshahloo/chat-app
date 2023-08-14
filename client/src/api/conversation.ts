import { RequestReturnType } from '../lib/axios'
import request from '../lib/axios'

export type ApiConvSearch = {
  id: number
  name: string
  _count: { members: number }
}

export const searchConvs = (
  query: string
): RequestReturnType<ApiConvSearch[]> => {
  return request.get('/conversation/search?query=' + query)
}
