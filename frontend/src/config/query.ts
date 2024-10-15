import { QueryClient, queryOptions } from '@tanstack/react-query'
import { userById } from '../api/users'

const queryClient = new QueryClient()

export const userViewQuery = (userId: string) => {
  return queryOptions({
    queryKey: ['userView', userId],
    queryFn: () => userById(userId),
  })
}

export default queryClient
