import type { components } from './userServiceSchema'

export type User = components['schemas']['User']
export type UserRelation = components['schemas']['UserRelation']

export type LoginRequest = components['schemas']['loginValidator']
export type RegisterRequest = components['schemas']['registerValidator']

export type GetPatientsRequest = components['schemas']['getPatientsValidator']
export type GetPatientsResponseInterface =
  components['schemas']['GetPatientsResponseInterface']
