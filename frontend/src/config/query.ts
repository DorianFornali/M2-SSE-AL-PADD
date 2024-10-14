import { QueryClient, queryOptions } from '@tanstack/react-query'
import { userById } from '../api/users'

const queryClient = new QueryClient()

export const patientViewQuery = (patientId: string) => {
  return queryOptions({
    queryKey: ['patientView', patientId],
    queryFn: () => userById(patientId),
  })
}

export default queryClient
