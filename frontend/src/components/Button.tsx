import { FC } from 'react'

type ButtonProps = {
  label: string
  onClick?: () => void
}

const Button: FC<ButtonProps> = (props) => {
  const { label, onClick } = props

  return <button onClick={onClick}>{label}</button>
}

export default Button
