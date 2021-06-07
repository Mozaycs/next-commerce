import type { Product } from '@commerce/types'
import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  MozaycApiHandler,
  MozaycHandler,
} from '../utils/create-api-handler'
import { MozaycApiError } from '../utils/errors'
import getProducts from './handlers/get-products'

export type SearchProductsData = {
  products: Product[]
  found: boolean
}

export type ProductsHandlers = {
  getProducts: MozaycHandler<
    SearchProductsData,
    { search?: string; category?: string; brand?: string; sort?: string }
  >
}

const METHODS = ['GET']

// TODO(lf): a complete implementation should have schema validation for `req.body`
const productsApi: MozaycApiHandler<SearchProductsData, ProductsHandlers> =
  async (req, res, config, handlers) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
      const body = req.query
      return await handlers['getProducts']({ req, res, config, body })
    } catch (error) {
      console.error(error)

      const message =
        error instanceof MozaycApiError
          ? 'An unexpected error ocurred with the Mozayc API'
          : 'An unexpected error ocurred'

      res.status(500).json({ data: null, errors: [{ message }] })
    }
  }

export const handlers = { getProducts }

export default createApiHandler(productsApi, handlers, {})
