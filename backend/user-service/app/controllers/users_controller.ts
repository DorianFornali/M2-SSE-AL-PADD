import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import {
  listingValidator,
  showValidator,
  updateValidator,
  deleteValidator,
  updateValidatorBody,
} from '../validators/users_validator.js'

export default class UsersController {
  /**
   * Display a list of users
   */
  async index({ request, response }: HttpContext) {
    const { page = 1, limit = 10, role } = await request.validateUsing(listingValidator)

    const query = User.query()

    if (role) {
      query.where('role', role)
    }

    const users = await query.paginate(page, limit)
    return response.ok(users)
  }

  /**
   * Show a single user by ID
   */
  async show({ params, response }: HttpContext) {
    const { id } = await showValidator.validate(params)
    try {
      const user = await User.findOrFail(id)
      return response.ok(user)
    } catch (error) {
      return response.notFound({ message: 'User not found', success: false })
    }
  }

  /**
   * Update a user's information
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = await updateValidator.validate(params)
    const payload = await request.validateUsing(updateValidatorBody)
    try {
      const user = await User.findOrFail(id)

      user.merge(payload)
      await user.save()

      return response.ok({ user, message: 'User updated successfully', success: true })
    } catch (error) {
      return response.badRequest({ message: 'Failed to update user', error, success: false })
    }
  }

  /**
   * Delete a user by ID
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = await deleteValidator.validate(params)
    try {
      const user = await User.findOrFail(id)
      await user.delete()

      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'User not found', success: false })
    }
  }
}
