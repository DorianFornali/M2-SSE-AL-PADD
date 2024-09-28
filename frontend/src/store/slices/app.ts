import { StateCreator } from 'zustand'

export interface AppSlice {
  isInitialized: boolean
  setIsInitialized: (isInitialized: boolean) => void
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  isInitialized: false,
  setIsInitialized: (isInitialized) => set({ isInitialized }),
})
