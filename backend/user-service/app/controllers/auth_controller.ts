import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth_validator'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = new User()

    user.fill(payload).save()

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      const token = await User.accessTokens.create(user)

      return response.ok({ user, token, success: true })
    } catch (error) {
      return response.badRequest({
        message: 'Invalid credentials',
        success: false,
      })
    }
  }

  async me({ auth, response }: HttpContext) {
    return response.ok(auth.user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user

    if (user) {
      await User.accessTokens.delete(user, auth.user!.currentAccessToken!.identifier)
    }

    return response.noContent()
  }
}
