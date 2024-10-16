import { Outlet } from '@tanstack/react-router'
import Header from '../components/Header'

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
