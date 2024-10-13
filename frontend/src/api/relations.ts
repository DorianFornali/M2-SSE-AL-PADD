import { userServiceClient } from '../config/client'
import {
  GetPatientsRequest,
  GetPatientsResponseInterface,
} from '../types/types'
import { getAuthCookie } from '../utils/cookies'

export const getPatients = async (
  data: GetPatientsRequest
): Promise<GetPatientsResponseInterface['patients']> => {
  const response = await userServiceClient.GET(
    // @ts-expect-error typing issue
    `/relations/${data.id}/patients`,
    {
      headers: {
        Authorization: getAuthCookie(),
      },
      method: 'GET',
    }
  )

  if (response.error) {
    throw new Error('Patients not found')
  }

  console.log('response', response)

  return (response.data as GetPatientsResponseInterface).patients
}
