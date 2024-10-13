import User from '../models/user.js'

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
