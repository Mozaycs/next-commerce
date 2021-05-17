/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback } from 'react'
import useMergeState from 'hooks/mergeState'
import api from 'service/api'

const useQuery = (url, { initData = {} }) => {
  const wasCalled = useRef(false)

  const [state, setState] = useMergeState({
    data: initData,
    error: null,
    isLoading: false,
  })
  const makeRequest = useCallback((variables) => {
    setState({ isLoading: true })
    api.get(url, variables).then(
      (data) => {
        setState({ data, error: null, isLoading: false })
      },
      (error) => {
        // put here general error handler
        setState({ error, data: initData, isLoading: false })
      }
    )
    wasCalled.current = true
  })
  return [makeRequest, state]
}

export default useQuery
