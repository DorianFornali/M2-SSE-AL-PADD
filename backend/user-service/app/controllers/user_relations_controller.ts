import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserRelation from '#models/user_relation'
import { RESPONSIBLE, ROLES } from '../enums/roles.js'
import {
  getPatientsValidator,
  getRelationsValidator,
  linkValidator,
  unlinkValidator,
} from '../validators/user_relations_validator.js'

export default class UserRelationController {
  /**
   * @linkPatient
   * @tag UserRelations
   * @operationId linkPatient
   * @description Link a patient to a doctor, nurse, or relative
   * @requestBody <linkValidator>
   * @responseBody 200 - <LinkPatientResponseInterface>
   **/
  async linkPatient({ request, response }: HttpContext) {
    const { patientId, relatedUserId, relationType } = await request.validateUsing(linkValidator)

    if (!Object.values(RESPONSIBLE).includes(relationType as unknown as RESPONSIBLE)) {
      return response.badRequest({ message: 'Invalid relation type', success: false })
    }

    const user = await User.find(patientId)
    const relatedUser = await User.find(relatedUserId)

    if (!user || !relatedUser) {
      return response.notFound({ message: 'User not found', success: false })
    }

    if (user.role !== ROLES.PATIENT) {
      return response.badRequest({ message: 'User is not a patient', success: false })
    }

    if ((relatedUser.role as unknown as RESPONSIBLE) !== relationType) {
      return response.badRequest({
        message: `Related user is not a ${relationType}`,
        success: false,
      })
    }

    const userRelation = new UserRelation()
    userRelation.userId = patientId
    userRelation.relatedUserId = relatedUserId
    userRelation.relationType = relationType

    await userRelation.save()

    return response.created({ message: 'Patient linked successfully', userRelation, success: true })
  }

  /**
   * @unlinkPatient
   * @tag UserRelations
   * @operationId unlinkPatient
   * @description Unlink a patient from a doctor, nurse, or relative
   * @requestBody <unlinkValidator>
   * @responseBody 200 - <UnlinkPatientResponseInterface>
   **/
  async unlinkPatient({ request, response }: HttpContext) {
    const { patientId, relatedUserId, relationType } = await request.validateUsing(unlinkValidator)

    const userRelation = await UserRelation.query()
      .where('userId', patientId)
      .andWhere('relatedUserId', relatedUserId)
      .andWhere('relationType', relationType)
      .first()

    if (!userRelation) {
      return response.notFound({ message: 'Relationship not found', success: false })
    }

    await userRelation.delete()

    return response.ok({ message: 'Patient unlinked successfully', success: true })
  }

  /**
   * @getPatients
   * @tag UserRelations
   * @operationId getPatients
   * @description Get the patients of a doctor, nurse, or relative
   * @requestParams id - The ID of the doctor, nurse, or relative
   * @responseBody 200 - <GetPatientsResponseInterface>
   **/
  async getPatients({ params, response }: HttpContext) {
    const { id } = await getPatientsValidator.validate(params)

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found', success: false })
    }

    if (!Object.values(RESPONSIBLE).includes(user.role as unknown as RESPONSIBLE)) {
      return response.badRequest({
        message: 'User is not a doctor, nurse, or relative',
        success: false,
      })
    }

    const patients = await UserRelation.query().where('relatedUserId', id).preload('user').exec()

    return response.ok({ patients, success: true })
  }

  /**
   * @getRelatedUsers
   * @tag UserRelations
   * @operationId getRelatedUsers
   * @description Get the doctor, nurse, and relatives of a patient
   * @requestParams id - The ID of the patient
   * @responseBody 200 - <UserRelation>
   **/
  async getRelatedUsers({ params, response }: HttpContext) {
    const { id } = await getRelationsValidator.validate(params)

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'Patient not found', success: false })
    }

    if (user.role !== ROLES.PATIENT) {
      return response.badRequest({ message: 'User is not a patient', success: false })
    }

    const doctor = await UserRelation.query()
      .where('userId', id)
      .andWhere('relationType', RESPONSIBLE.DOCTOR)
      .preload('relatedUser')
      .first()

    const nurse = await UserRelation.query()
      .where('userId', id)
      .andWhere('relationType', RESPONSIBLE.NURSE)
      .preload('relatedUser')
      .first()

    const relatives = await UserRelation.query()
      .where('userId', id)
      .andWhere('relationType', RESPONSIBLE.RELATIVE)
      .preload('relatedUser')
      .exec()

    return response.ok({ doctor, nurse, relatives, success: true })
  }
}
