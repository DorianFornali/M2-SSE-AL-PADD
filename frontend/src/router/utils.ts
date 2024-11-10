import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '../store/store'
import { routes } from './definitions'
import { me } from '../api/auth'

export const redirectIfUnauthenticated = async () => {
  const user = useAuthStore.getState().user

  if (!user) {
    try {
      const res = await me()
      if (res) {
        useAuthStore.getState().setUser(res)
      }
    } catch {
      throw redirect({
        to: routes.login.path,
        search: {
          redirect: location.href,
        },
      })
    }
  }
}

export const redirectIfAuthenticated = async (path: string) => {
  const user = useAuthStore.getState().user

  if (!user) {
    try {
      const res = await me()

      if (res) {
        useAuthStore.getState().setUser(res)
        console.log('redirectIfAuthenticated', path)
        throw redirect({
          to: path,
        })
      }
    } catch {
      return
    }
  }

  if (user) {
    throw redirect({
      to: path,
    })
  }
}
