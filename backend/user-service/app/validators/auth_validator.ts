import vine from '@vinejs/vine'
import { ROLES } from '../enums/roles.js'

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8),
    first_name: vine.string(),
    last_name: vine.string(),
    phone_number: vine.string(),
    address: vine.string(),
    birth_date: vine.string(),
    role: vine.enum(ROLES),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
