import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <Button variant="contained" color="primary">
        Material Button
      </Button>
    </div>
  )
}

export default HomePage
