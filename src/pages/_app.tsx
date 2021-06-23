import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'
import NextProgressBar from 'nextjs-progressbar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../services/firebase'

import '../styles/global.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <NextProgressBar
        color="#835afd"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
