import { userServiceClient } from '../config/client'
import {
  GetPatientsRequest,
  GetPatientsResponseInterface,
  GetRelationsRequest,
  GetRelationsResponseInterface,
  LinkPatientRequest,
  LinkPatientResponse,
  UnlinkPatientRequest,
  UnlinkPatientResponse,
} from '../types/types'
import { getAuthCookie } from '../utils/cookies'

export const getMyPatients = async (
  data: GetPatientsRequest
): Promise<GetPatientsResponseInterface['patients']> => {
  const response = await userServiceClient.GET(`/relations/{id}/patients`, {
    headers: {
      Authorization: getAuthCookie(),
    },
    method: 'GET',
    params: {
      path: { id: data.id!.toString() },
    },
  })

  if (response.error) {
    throw new Error('Patients not found')
  }

  return response.data.patients
}

export const getMyRelations = async (
  data: GetRelationsRequest
): Promise<GetRelationsResponseInterface> => {
  const response = await userServiceClient.GET(
    `/relations/{id}/related-users`,
    {
      headers: {
        Authorization: getAuthCookie(),
      },
      method: 'GET',
      params: {
        path: { id: data.id!.toString() },
      },
    }
  )

  if (response.error) {
    throw new Error('Relatives not found')
  }

  return response.data
}

export const linkPatient = async (
  data: LinkPatientRequest
): Promise<LinkPatientResponse['userRelation']> => {
  const response = await userServiceClient.POST(`/relations/link`, {
    headers: {
      Authorization: getAuthCookie(),
    },
    method: 'POST',
    body: data,
  })

  if (response.error) {
    throw new Error('Link patient failed')
  }

  return response.data.userRelation
}

export const unlinkPatient = async (
  data: UnlinkPatientRequest
): Promise<UnlinkPatientResponse['message']> => {
  const response = await userServiceClient.POST(`/relations/unlink`, {
    headers: {
      Authorization: getAuthCookie(),
    },
    method: 'POST',
    body: data,
  })

  if (response.error) {
    throw new Error('Unlink patient failed')
  }

  return response.data.message
}
