import { create } from 'zustand'

import { AppSlice, createAppSlice } from './slices/app'

type StoreState = AppSlice

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAppSlice(...a),
}))
