import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import RootLayout from '../layouts/RootLayout'
import NotFoundPage from '../pages/404'
import HomePage from '../pages/Home'

import { routes } from './definitions'

export const rootRoute = createRootRoute({
  component: RootLayout,
  // beforeLoad: init,
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

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree, notFoundRoute })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
