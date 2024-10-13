import APP from '../config/app'

export const getAuthCookie = (): string => {
  return `Bearer ${document.cookie.replace(`${APP.AUTH_TOKEN}=`, '')}`
}
