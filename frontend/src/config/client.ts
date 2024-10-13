import createClient from 'openapi-fetch'

import API from './api'
import type { paths } from '../types/userServiceSchema'

export const userServiceClient = createClient<paths>({
  baseUrl: API.USER_SERVICE_URL,
})
