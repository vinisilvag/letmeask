import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { useRouter } from 'next/router'

import styles from '../styles/auth.module.scss'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'
import joinRoomIcon from '../assets/images/join-room.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

const Home: React.FC = () => {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle()
    }

    router.push('/rooms/new')
  }

  return (
    <div className={styles.pageAuth}>
      <Head>
        <title>Home | Letmeask</title>
        <meta
          name="description"
          content="Aprenda e compartilhe conhecimento com outras pessoas"
        />
      </Head>

      <aside>
        <div>
          <Image
            src={illustrationImg}
            alt="Ilustração simbolizando perguntas e respostas"
            width={320}
          />
        </div>

        <strong>
          Toda pergunta tem
          <br />
          uma resposta.
        </strong>
        <p>
          Aprenda e compartilhe conhecimento
          <br />
          com outras pessoas
        </p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <div>
            <Image src={logoImg} alt="Letmeask" />
          </div>

          <button className={styles.createRoom} onClick={handleCreateRoom}>
            <div>
              <Image src={googleIconImage} alt="Logo do Google" />
            </div>
            Crie sua sala com o Google
          </button>

          <div className={styles.separator}>ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">
              <div>
                <Image src={joinRoomIcon} alt="Entrar na sala" />
              </div>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
