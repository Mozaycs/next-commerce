/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/rules-of-hooks */
import useMutation from './mutation'
import useQuery from './query'

export default {
  get: (...args) => useQuery(...args),
  post: (...args) => useMutation('post', ...args),
  put: (...args) => useMutation('put', ...args),
  delete: (...args) => useMutation('delete', ...args),
}
