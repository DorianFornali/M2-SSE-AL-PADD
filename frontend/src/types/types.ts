import type { components } from './userServiceSchema'

export type User = components['schemas']['User']
export type UserRelation = components['schemas']['UserRelation']

export type LoginRequest = components['schemas']['loginValidator']
export type RegisterRequest = components['schemas']['registerValidator']

export type GetPatientsRequest = components['schemas']['getPatientsValidator']
export type GetPatientsResponseInterface =
  components['schemas']['GetPatientsResponseInterface']

export type GetRelationsRequest = components['schemas']['getRelationsValidator']
export type GetRelationsResponseInterface =
  components['schemas']['GetRelationsResponseInterface']

export type LinkPatientRequest = components['schemas']['linkValidator']
export type LinkPatientResponse =
  components['schemas']['LinkPatientResponseInterface']

export type UnlinkPatientRequest = components['schemas']['unlinkValidator']
export type UnlinkPatientResponse =
  components['schemas']['UnlinkPatientResponseInterface']

export type UsersList = {
  meta: components['schemas']['PaginationMeta']
  data: User[]
}

export type HealthRecord = components['schemas']['HealthRecord']
export type HealthReport = components['schemas']['HealthReport']
export type SleepPace = components['schemas']['SleepPace']
