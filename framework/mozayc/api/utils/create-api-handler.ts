import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { MozaycConfig, getConfig } from '..'

export type MozaycApiHandler<
  T = any,
  H extends MozaycHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<MozaycApiResponse<T>>,
  config: MozaycConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type MozaycHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<MozaycApiResponse<T>>
  config: MozaycConfig
  body: Body
}) => void | Promise<void>

export type MozaycHandlers<T = any> = {
  [k: string]: MozaycHandler<T, any>
}

export type MozaycApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends MozaycHandlers = {},
  Options extends {} = {}
>(
  handler: MozaycApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: MozaycConfig
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops, opts)
    }
  }
}
