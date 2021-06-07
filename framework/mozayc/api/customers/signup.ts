import createApiHandler, {
  MozaycApiHandler,
  MozaycHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { MozaycApiError } from '../utils/errors'
import signup from './handlers/signup'

export type SignupBody = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type SignupHandlers = {
  signup: MozaycHandler<null, { cartId?: string } & Partial<SignupBody>>
}

const METHODS = ['POST']

const signupApi: MozaycApiHandler<null, SignupHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  try {
    const body = { ...req.body, cartId }
    return await handlers['signup']({ req, res, config, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof MozaycApiError
        ? 'An unexpected error ocurred with the Mozayc API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { signup }

export default createApiHandler(signupApi, handlers, {})
