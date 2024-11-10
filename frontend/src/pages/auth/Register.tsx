import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import { Select } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { register } from '../../api/auth'
import { routes } from '../../router/definitions'
import { useNavigate } from '@tanstack/react-router'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}))

export default function RegisterPage() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate({
        to: routes.login.path,
      })
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    mutation.mutate({
      email: data.get('email') as string,
      password: data.get('password') as string,
      last_name: data.get('last_name') as string,
      first_name: data.get('first_name') as string,
      phone_number: data.get('phone_number') as string,
      address: data.get('address') as string,
      birth_date: data.get('birth_date') as string,
      // @ts-expect-error - role is a string
      role: data.get('role') as string,
    })
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            S'inscrire
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="last_name">Nom de famille</FormLabel>
              <TextField
                autoComplete="last_name"
                name="last_name"
                required
                fullWidth
                id="last_name"
                placeholder="Snow"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="first_name">Prénom</FormLabel>
              <TextField
                autoComplete="first_name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                placeholder="Jon"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone_number">Numéro de téléphone</FormLabel>
              <TextField
                required
                fullWidth
                id="phone_number"
                placeholder="1234567890"
                name="phone_number"
                autoComplete="phone_number"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Adresse</FormLabel>
              <TextField
                required
                fullWidth
                id="address"
                placeholder="1234 Main St"
                name="address"
                autoComplete="address"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="birth_date">Date de naissance</FormLabel>
              <TextField
                required
                fullWidth
                id="birth_date"
                placeholder="01/01/1990"
                name="birth_date"
                autoComplete="birth_date"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select
                required
                fullWidth
                id="role"
                name="role"
                variant="outlined"
                native
              >
                {['PATIENT', 'RELATIVE', 'DOCTOR', 'NURSE'].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              S'inscrire
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Vous avez déjà un compte ?{' '}
              <span>
                <Link
                  onClick={() =>
                    navigate({
                      to: routes.login.path,
                    })
                  }
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Se connecter
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  )
}
