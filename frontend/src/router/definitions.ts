const rootRoute = {
  root: {
    path: '/',
  },
}
const authRoutes = {
  login: {
    path: '/login',
  },
  register: {
    path: '/register',
  },
}

const appRoutes = {
  dashboard: {
    path: '/dashboard',
  },
  patientView: {
    path: '/patient/$id',
  },
}

const errorRoutes = {
  notFound: {
    path: '/404',
  },
}

export const routes = {
  ...rootRoute,
  ...authRoutes,
  ...appRoutes,
  ...errorRoutes,
} as const
