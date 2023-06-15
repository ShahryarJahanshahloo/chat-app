declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number
      }
      token?: string
    }
  }

  export interface BigInt {
    toJSON: () => string
  }
}

export {}
