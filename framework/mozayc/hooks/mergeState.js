/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react'

const useMergeState = (initState) => {
  const [state, setState] = useState(initState || {})

  const mergeState = useCallback((newState) => {
    setState((currentState) => ({ ...currentState, ...newState }))
  })

  return [state, mergeState]
}
export default useMergeState
