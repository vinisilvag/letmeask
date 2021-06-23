import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../../styles/auth.module.scss'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import illustrationImg from '../../../public/illustration.svg'
import logoImg from '../../../public/logo.svg'

type CreateRoomFormData = {
  newRoom: string
}

const NewRoom: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<CreateRoomFormData>()

  const handleCreateRoom: SubmitHandler<CreateRoomFormData> = async data => {
    const { newRoom } = data

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    router.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div className={styles.pageAuth}>
      <Head>
        <title>Criar sala | Letmeask</title>
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

          <h2>Crie uma nova sala</h2>

          <form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              {...register('newRoom')}
            />
            <Button type="submit" isLoading={isSubmitting}>
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala já existente?{' '}
            <Link href="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom
