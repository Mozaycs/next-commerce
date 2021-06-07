import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
import fetchStoreApi from './utils/fetch-store-api'

export interface MozaycConfig extends CommerceAPIConfig {
  // Indicates if the returned metadata with translations should be applied to the
  // data or returned as it is
  applyLocale?: string
  commerceUrl: string
  storeApiUrl: string
  storeApiToken: string
  storeChannelId?: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const API_URL = process.env.MOZAYC_API_URL

export class Config {
  private config: MozaycConfig

  constructor(config: any) {
    this.config = {
      ...config,
      // The customerCookie is not customizable for now, BC sets the cookie and it's
      // not important to rename it
      customerCookie: 'SHOP_TOKEN',
    }
  }

  getConfig(userConfig: Partial<MozaycConfig> = {}) {
    return Object.entries(userConfig).reduce<MozaycConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<MozaycConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  commerceUrl: API_URL,
  storeApiUrl: API_URL,
  storeApiToken: '',
  storeApiFetch: fetchStoreApi,
})

export function getConfig(userConfig?: Partial<MozaycConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<MozaycConfig>) {
  return config.setConfig(newConfig)
}
