import { StateCreator } from 'zustand'

import { logout, me } from '../../api/auth'
import { User } from '../../types/types'

export interface AuthSlice {
  user: User | null
  setUser: (user: User) => void
  init: () => void
  logout: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  init: async () => {
    try {
      const res = await me()
      set({ user: res })
    } catch (error) {
      set({ user: null })
      console.error(error)
    }
  },

  logout: async () => {
    await logout()
    set({ user: null })
  },
})
