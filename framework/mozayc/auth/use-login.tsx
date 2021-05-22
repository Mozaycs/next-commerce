import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import useCustomer from '../customer/use-customer'

export default useLogin as UseLogin<typeof handler>

type LoginBody = {
  email: string
  password: string
}

export const handler: MutationHook<null, {}, LoginBody> = {
  fetchOptions: {
    url: `/api/auth/local`,
    method: 'POST',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    console.log('Login Mozyc', options)
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }

    return fetch({
      ...options,
      body: { email, password, provider: 'local', login_type: 'user' },
    })
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { revalidate } = useCustomer()

      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
