import { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

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
    <button
      className={[styles.button, isOutlined && styles.outlined].join(' ')}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  )
}
