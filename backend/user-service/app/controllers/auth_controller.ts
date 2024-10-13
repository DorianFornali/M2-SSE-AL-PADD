import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth_validator'

export default class AuthController {
  /**
   * @register
   * @tag Auth
   * @operationId register
   * @description Register a new user
   * @requestBody <registerValidator>
   * @responseBody 200 - <User>
   **/
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = new User()

    user.fill(payload).save()

    return response.created(user)
  }

  /**
   * @login
   * @tag Auth
   * @operationId login
   * @description Log in a user
   * @requestBody <loginValidator>
   * @responseBody 200 - <LoginResponseInterface>
   **/
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

  /**
   * @me
   * @tag Auth
   * @operationId me
   * @description Get the current user using the access token in the Authorization header (Bearer ${token})
   * @responseBody 200 - <User>
   **/
  async me({ auth, response }: HttpContext) {
    return response.ok(auth.user)
  }

  /**
   * @logout
   * @tag Auth
   * @operationId logout
   * @description Log out the current user using the access token in the Authorization header (Bearer ${token})
   **/
  async logout({ auth, response }: HttpContext) {
    const user = auth.user

    if (user) {
      await User.accessTokens.delete(user, auth.user!.currentAccessToken!.identifier)
    }

    return response.noContent()
  }
}
