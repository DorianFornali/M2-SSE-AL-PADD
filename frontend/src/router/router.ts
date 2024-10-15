import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import RootLayout from '../layouts/RootLayout'
import NotFoundPage from '../pages/404'
import HomePage from '../pages/Home'

import { routes } from './definitions'
import LoginPage from '../pages/auth/Login'
import { redirectIfAuthenticated, redirectIfUnauthenticated } from './utils'
import DashboardPage from '../pages/Dashboard'
import RegisterPage from '../pages/auth/Register'
import UserViewPage from '../pages/user/UserView'
import { userViewQuery } from '../config/query'

export const rootRoute = createRootRoute({
  component: RootLayout,
  // beforeLoad: init,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.login.path,
  component: LoginPage,
  beforeLoad: () => redirectIfAuthenticated(routes.dashboard.path),
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.register.path,
  component: RegisterPage,
  beforeLoad: () => redirectIfAuthenticated(routes.dashboard.path),
})

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.notFound.path,
  component: NotFoundPage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.root.path,
  component: HomePage,
  // beforeLoad: redirectIfUnauthenticated,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.dashboard.path,
  component: DashboardPage,
  beforeLoad: redirectIfUnauthenticated,
})

const userViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.userView.path,
  component: UserViewPage,
  beforeLoad: redirectIfUnauthenticated,
  loader: ({ params: { id } }: { params: { id: string } }) => userViewQuery(id),
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  userViewRoute,
])

export const router = createRouter({ routeTree, notFoundRoute })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
