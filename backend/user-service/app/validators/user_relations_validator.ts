import vine from '@vinejs/vine'
import { RESPONSIBLE } from '../enums/roles.js'

export const linkValidator = vine.compile(
  vine.object({
    patientId: vine.number(),
    relatedUserId: vine.number(),
    relationType: vine.enum(RESPONSIBLE),
  })
)

export const unlinkValidator = vine.compile(
  vine.object({
    patientId: vine.number(),
    relatedUserId: vine.number(),
    relationType: vine.enum(RESPONSIBLE),
  })
)

export const getPatientsValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const getRelationsValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
