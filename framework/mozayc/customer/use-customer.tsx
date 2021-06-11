import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import type { GetLoggedInCustomerQuery } from '../schema'
import useCustomerMapper from '../mapper/use-customer-mapper'

type Customer = {
  email: string
  name: string
  userType: string
  _id: number
}

type CustomerData = {
  customer: Customer
}

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    url: `/api/users`,
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<CustomerData | null>(options)
    return useCustomerMapper(data)
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
