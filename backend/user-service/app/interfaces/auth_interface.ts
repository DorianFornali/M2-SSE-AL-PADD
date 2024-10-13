import User from '../models/user.js'

export interface TokenInterface {
  // @enum('bearer')
  type: string
  name: string
  token: string
  abilities: string[]
  lastUsedAt: string
  expiresAt: string
}

export interface LoginResponseInterface {
  user: User
  token: TokenInterface
  success: string
}
