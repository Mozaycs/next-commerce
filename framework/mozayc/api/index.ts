import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
// import fetchGraphqlApi from './utils/fetch-graphql-api'
// import fetchStoreApi from './utils/fetch-store-api'

export interface BigcommerceConfig extends CommerceAPIConfig {
  // Indicates if the returned metadata with translations should be applied to the
  // data or returned as it is
  applyLocale?: boolean
  storeApiUrl: string
  storeApiToken: string
  storeApiClientId: string
  storeChannelId?: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const API_URL = process.env.MOZAY_API_URL

export class Config {
  private config: BigcommerceConfig

  constructor(config: any) {
    this.config = {
      ...config,
      // The customerCookie is not customizable for now, BC sets the cookie and it's
      // not important to rename it
      customerCookie: 'SHOP_TOKEN',
    }
  }

  getConfig(userConfig: Partial<BigcommerceConfig> = {}) {
    return Object.entries(userConfig).reduce<BigcommerceConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<BigcommerceConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  commerceUrl: API_URL,
})

export function getConfig(userConfig?: Partial<BigcommerceConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<BigcommerceConfig>) {
  return config.setConfig(newConfig)
}
