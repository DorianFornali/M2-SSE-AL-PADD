import vine from '@vinejs/vine'

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
    // @enum('PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN')
    role: vine.enum(['PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE', 'ADMIN']),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
