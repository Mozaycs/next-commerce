import { GetCustomerIdQuery } from '../schema'
import { MozaycConfig, getConfig } from '../api'

export const getCustomerIdQuery = /* GraphQL */ `
  query getCustomerId {
    customer {
      entityId
    }
  }
`

async function getCustomerId({
  customerToken,
  config,
}: {
  customerToken: string
  config?: MozaycConfig
}): Promise<number | undefined> {
  config = getConfig(config)

  const { data } = await config.fetch<GetCustomerIdQuery>(
    getCustomerIdQuery,
    undefined,
    {
      headers: {
        cookie: `${config.customerCookie}=${customerToken}`,
      },
    }
  )

  return data?.customer?.entityId
}

export default getCustomerId
