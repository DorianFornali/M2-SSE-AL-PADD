/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

import { middleware } from '#start/kernel'

const HealthController = () => import('#controllers/health_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const UserRelationsController = () => import('#controllers/user_relations_controller')

router.get('/health', [HealthController, 'checkHealth'])

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router
      .group(() => {
        router.post('/logout', [AuthController, 'logout'])
        router.get('/me', [AuthController, 'me'])
      })
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('auth')

router
  .group(() => {
    router.resource('users', UsersController).apiOnly().except(['store'])
    router
      .group(() => {
        router.get('/:id/patients', [UserRelationsController, 'getPatients'])
        router.get('/:id/related-users', [UserRelationsController, 'getRelatedUsers'])
        router.post('/link', [UserRelationsController, 'linkPatient'])
        router.post('/unlink', [UserRelationsController, 'unlinkPatient'])
      })
      .prefix('relations')
  })
  .use(middleware.auth({ guards: ['api'] }))

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/users/swagger', swagger)
})
