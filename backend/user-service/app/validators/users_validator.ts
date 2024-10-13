import vine from '@vinejs/vine'

export const listingValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    // @enum('PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN')
    role: vine.enum(['PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN']).optional(),
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
    // @enum('PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN')
    role: vine.enum(['PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN']).optional(),
  })
)

export const deleteValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
