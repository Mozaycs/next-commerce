import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useRemoveItem, {
  RemoveItemInput,
  UseRemoveItem,
} from '@commerce/wishlist/use-remove-item'
import useCustomer from '../customer/use-customer'
import useWishlist, { UseWishlistInput } from './use-wishlist'
import type { Product } from '@commerce/types'
import { definitions } from '../api/definitions/wishlist'
import { ProductEdge } from '../product/get-all-products'

type RemoveItemBody = { itemId: Product['id'] }

export type Wishlist = Omit<definitions['wishlist_Full'], 'items'> & {
  items?: WishlistItem[]
}

type WishlistItem = NonNullable<definitions['wishlist_Full']['items']>[0] & {
  product?: ProductEdge['node']
}

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<
  Wishlist | null,
  { wishlist?: UseWishlistInput },
  RemoveItemInput,
  RemoveItemBody
> = {
  fetchOptions: {
    url: '/api/wishlist/:id',
    method: 'DELETE',
  },
  useHook:
    ({ fetch }) =>
    ({ wishlist } = {}) => {
      const { data: customer } = useCustomer()
      const { revalidate } = useWishlist(wishlist)

      return useCallback(
        async function removeItem(input) {
          if (!customer) {
            // A signed customer is required in order to have a wishlist
            throw new CommerceError({
              message: 'Signed customer not found',
            })
          }

          const data = await fetch({ input: { itemId: String(input.id) } })
          await revalidate()
          return data
        },
        [fetch, revalidate, customer]
      )
    },
}
