import { ButtonHTMLAttributes } from 'react'

import { CustomButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  isOutlined?: boolean
}

export const Button = ({
  isLoading = false,
  isOutlined,
  children,
  ...props
}: ButtonProps) => {
  return (
    <CustomButton outlined={isOutlined} {...props}>
      {isLoading ? 'Carregando...' : children}
    </CustomButton>
  )
}
