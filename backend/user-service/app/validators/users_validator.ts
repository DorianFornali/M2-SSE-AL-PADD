import vine from '@vinejs/vine'
import { ROLES } from '../enums/roles.js'

export const listingValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    role: vine.enum(ROLES).optional(),
  })
)

export const showValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const updateValidatorBody = vine.compile(
  vine.object({
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    email: vine.string().optional(),
    phoneNumber: vine.string().optional(),
    address: vine.string().optional(),
    birthDate: vine.string().optional(),
    role: vine.enum(ROLES).optional(),
  })
)

export const deleteValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
