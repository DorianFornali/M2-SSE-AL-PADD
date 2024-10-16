import { create } from 'zustand'

import { AppSlice, createAppSlice } from './slices/app'
import { AuthSlice, createAuthSlice } from './slices/auth'

type StoreState = AppSlice

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAppSlice(...a),
}))

export const useAuthStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}))
