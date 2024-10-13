import React from 'react'
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/store'
import { routes } from '../router/definitions'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogin = () => {
    navigate({
      to: routes.login.path,
    })
  }

  const handleAccount = () => {
    navigate({
      to: routes.dashboard.path,
    })
  }

  const handleHome = () => {
    navigate({
      to: routes.dashboard.path,
    })
  }

  const handleLogout = () => {
    navigate({
      to: routes.login.path,
    })
    logout()
  }

  return (
    <Box sx={{ flexGrow: 1 }} component="header">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            color="secondary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: 1, cursor: 'pointer' }}
            onClick={handleHome}
          >
            {t('app.name')}
          </Typography>
          {user ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 2,
                }}
              >
                <Typography component="p">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography component="p">{user.role}</Typography>
              </Box>
            </Box>
          ) : null}
          {user ? (
            <>
              <Avatar
                onClick={handleAccount}
                sx={{
                  bgcolor: 'primary.main',
                  marginRight: 2,
                }}
              >
                {user?.firstName?.charAt(0).toUpperCase()}
              </Avatar>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="secondary"
                size="large"
              >
                {t('header.logout')}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<PersonIcon />}
            >
              {t('header.login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
