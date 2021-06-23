import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../styles/auth.module.scss'

import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import illustrationImg from '../../public/illustration.svg'
import logoImg from '../../public/logo.svg'
import googleIconImage from '../../public/google-icon.svg'
import joinRoomIcon from '../../public/join-room.svg'

type JoinRoomFormData = {
  roomCode: string
}

const Home: React.FC = () => {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<JoinRoomFormData>()

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle()
    }

    router.push('/rooms/new')
  }

  const handleJoinRoom: SubmitHandler<JoinRoomFormData> = async data => {
    const { roomCode } = data

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      toast.error('Sala não encontrada.')
      return
    }

    router.push(`/rooms/${roomCode}`)
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

          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              {...register('roomCode')}
            />
            <Button type="submit" isLoading={isSubmitting}>
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
