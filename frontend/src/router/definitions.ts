const rootRoute = {
  root: {
    path: '/',
  },
}

const appRoutes = {
  dashboard: {
    path: '/dashboard',
  },
}

const errorRoutes = {
  notFound: {
    path: '/404',
  },
}

export const routes = {
  ...rootRoute,
  ...appRoutes,
  ...errorRoutes,
} as const
