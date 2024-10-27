import { transformUser } from '../adapters/user'
import { userServiceClient } from '../config/client'
import { UsersList } from '../types/types'
import { LocalUser } from '../types/user'
import { getAuthCookie } from '../utils/cookies'

export const users = async (data: {
  limit: number
  role: string
}): Promise<UsersList['data']> => {
  const response = await userServiceClient.GET(`/users`, {
    headers: {
      Authorization: getAuthCookie(),
    },
    method: 'GET',
    params: {
      // @ts-expect-error - query is not defined in the OpenAPI schema
      query: {
        limit: data.limit,
        role: data.role,
      },
    },
  })

  if (response.error) {
    throw new Error('Users not found')
  }

  return (response.data as UsersList).data
}

export const userById = async (id: string): Promise<LocalUser> => {
  const response = await userServiceClient.GET(`/users/{id}`, {
    headers: {
      Authorization: getAuthCookie(),
    },
    params: {
      path: { id: id },
    },
    method: 'GET',
  })

  if (response.error) {
    throw new Error('User not found')
  }

  return transformUser(response.data)
}
