import APP from '../config/app'
import { userServiceClient } from '../config/client'
import { LoginRequest, RegisterRequest } from '../types/types'
import { getAuthCookie } from '../utils/cookies'

export const me = async () => {
  const response = await userServiceClient.GET('/auth/me', {
    headers: {
      Authorization: getAuthCookie(),
    },
    method: 'GET',
  })

  if (response.error) {
    throw new Error('User not found')
  }

  return response.data
}

export const login = async (data: LoginRequest) => {
  const response = await userServiceClient.POST('/auth/login', {
    method: 'POST',
    body: data,
  })

  if (!response.data?.success) {
    throw new Error('Invalid credentials')
  }

  if (response.data.token) {
    document.cookie = `${APP.AUTH_TOKEN}=${response.data.token.token}`
  }

  return response.data.user!
}

export const register = async (data: RegisterRequest) => {
  const response = await userServiceClient.POST('/auth/register', {
    credentials: 'include',
    method: 'POST',
    body: data,
  })

  if (response.error) {
    throw new Error('Invalid credentials')
  }

  return response.data
}

export const logout = async () => {
  try {
    await userServiceClient.POST('/auth/logout', {
      headers: {
        Authorization: getAuthCookie(),
      },
      method: 'POST',
    })

    document.cookie = `${APP.AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  } catch (error) {
    console.error(error)
  }
}
