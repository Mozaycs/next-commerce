/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import useMergeState from 'hooks/mergeState'
import api from 'service/api'

const useMutation = (method, url) => {
  const [state, setState] = useMergeState({
    data: null,
    error: null,
    isLoading: false,
  })
  const makeRequest = useCallback(
    (variables) => {
      new Promise((resolve, reject) => {
        setState({ isLoading: true })

        api[method](url, variables).then(
          (data) => {
            resolve(data)
            setState({ data, error: null, isLoading: false })
          },
          (error) => {
            // put here general error handler
            reject(error)
            setState({ error, data: null, isLoading: false })
          }
        )
      })
    },
    [method, url, setState]
  )
  return [makeRequest, state]
}

export default useMutation
