import vine from '@vinejs/vine'

export const linkValidator = vine.compile(
  vine.object({
    patientId: vine.number(),
    relatedUserId: vine.number(),
    // @enum('DOCTOR', 'NURSE', 'RELATIVE')
    relationType: vine.enum(['DOCTOR', 'NURSE', 'RELATIVE']),
  })
)

export const unlinkValidator = vine.compile(
  vine.object({
    patientId: vine.number(),
    relatedUserId: vine.number(),
    // @enum('DOCTOR', 'NURSE', 'RELATIVE')
    relationType: vine.enum(['DOCTOR', 'NURSE', 'RELATIVE']),
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
