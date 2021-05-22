import type { ItemBody as WishlistItemBody } from '../../wishlist/use-add-item'
import type { CartItemBody, OptionSelections } from '../../types'

type MZWishlistItemBody = {
  product_id: number
  variant_id: number
}

type MZCartItemBody = {
  product_id: number
  variant_id: number
  quantity?: number
  option_selections?: OptionSelections
}

export const parseWishlistItem = (
  item: WishlistItemBody
): MZWishlistItemBody => ({
  product_id: Number(item.productId),
  variant_id: Number(item.variantId),
})

export const parseCartItem = (item: CartItemBody): MZCartItemBody => ({
  quantity: item.quantity,
  product_id: Number(item.productId),
  variant_id: Number(item.variantId),
  option_selections: item.optionSelections,
})
