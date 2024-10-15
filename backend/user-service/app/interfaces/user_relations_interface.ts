import User from '../models/user.js'
import UserRelation from '../models/user_relation.js'

export interface Patient {
  id: number
  userId: number
  relatedUserId: number
  // @enum('DOCTOR', 'NURSE', 'RELATIVE')
  relationType: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface GetPatientsResponseInterface {
  patients: Patient[]
  success: string
}

export interface LinkPatientResponseInterface {
  message: string
  success: boolean
  userRelation: UserRelation
}

export interface UnlinkPatientResponseInterface {
  message: string
  success: boolean
}

export interface GetRelationsResponseInterface {
  doctor: UserRelation
  nurse: UserRelation
  relatives: UserRelation[]
  success: boolean
}
