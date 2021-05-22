import type { Response } from '@vercel/fetch'

// Used for GraphQL errors
export class MozaycGraphQLError extends Error {}

export class MozaycApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'MozaycApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class MozaycNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'MozaycNetworkError'
  }
}
