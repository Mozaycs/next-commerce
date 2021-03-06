import createApiHandler, {
  MozaycApiHandler,
  MozaycHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { MozaycApiError } from '../utils/errors'
import getLoggedInCustomer, {
  Customer,
} from './handlers/get-logged-in-customer'

export type { Customer }

export type CustomerData = {
  customer: Customer
}

export type CustomersHandlers = {
  getLoggedInCustomer: MozaycHandler<CustomerData>
}

const METHODS = ['GET']

const customersApi: MozaycApiHandler<CustomerData, CustomersHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    const body = null
    return await handlers['getLoggedInCustomer']({ req, res, config, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof MozaycApiError
        ? 'An unexpected error ocurred with the Mozayc API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { getLoggedInCustomer }

export default createApiHandler(customersApi, handlers, {})
