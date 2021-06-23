import { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean
}

export const Button = ({
  isLoading = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {isLoading ? 'Carregando...' : children}
    </button>
  )
}
