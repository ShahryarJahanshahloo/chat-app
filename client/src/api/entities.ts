export type ApiUser = {
  id: number
  username: string
  color: string
  email: string
}

export type ApiNewUser = {
  email: string
  password: string
  name: string
  color?: string
}

export type ApiConvSearch = {
  id: number
  name: string
  _count: { members: number }
}
