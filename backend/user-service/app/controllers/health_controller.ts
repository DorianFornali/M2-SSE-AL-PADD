import type { HttpContext } from '@adonisjs/core/http'

export default class HealthController {
  /**
   * @checkHealth
   * @tag Health
   * @operationId checkHealth
   * @description Check if the server is running
   * @responseBody 200 - { status: string, message: string }
   */
  public async checkHealth({ response }: HttpContext) {
    response.ok({
      status: 'ok',
      message: 'Server is running',
    })
  }
}
