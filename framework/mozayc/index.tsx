import type { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { mozaycProvider, MozaycProvider } from './provider'

export { mozaycProvider }
export type { MozaycProvider }

export const mozaycConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
}

export type MozaycConfig = Partial<CommerceConfig>

export type MozaycProps = {
  children?: ReactNode
  locale: string
} & MozaycConfig

export function CommerceProvider({ children, ...config }: MozaycProps) {
  return (
    <CoreCommerceProvider
      provider={mozaycProvider}
      config={{ ...mozaycConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<MozaycProvider>()
