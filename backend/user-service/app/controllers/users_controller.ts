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
   * @listUsers
   * @tag Users
   * @operationId listUsers
   * @description List all users
   * @requestBody <listingValidator>
   * @responseBody 200 - <User[]>.paginated()
   **/
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
   * @showUser
   * @tag Users
   * @operationId showUser
   * @description Get a user by ID
   * @requestBody <showValidator>
   * @responseBody 200 - <User>
   * @response 404 - User not found
   **/
  async show({ params, response }: HttpContext) {
    const { id } = await showValidator.validate(params)
    try {
      const user = await User.query()
        .where('id', id)
        .preload('healthRecords', (healthRecordsQuery) => {
          healthRecordsQuery.preload('bloodPressure')
        })
        .preload('sleepPaces')
        .preload('healthReports')
        .firstOrFail()
      return response.ok(user)
    } catch (error) {
      console.log('Error', error)
      return response.notFound({ message: 'User not found', success: false })
    }
  }

  /**
   * @createUser
   * @tag Users
   * @operationId updateUser
   * @description Update a user by ID
   * @requestBody <updateValidator>
   * @responseBody 200 - <User>
   * @response 400 - Failed to update user
   **/
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
   * @deleteUser
   * @tag Users
   * @operationId deleteUser
   * @description Delete a user by ID
   * @requestBody <deleteValidator>
   * @response 204 - User deleted successfully
   * @response 404 - User not found
   **/
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
