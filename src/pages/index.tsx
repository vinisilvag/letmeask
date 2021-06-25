import React from 'react'

import {
  Container,
  AsideContainer,
  PageTitle,
  PageSubtitle,
  MainContainer,
  Content,
  CreateRoomButton,
  Separator,
  FormContainer,
  Input,
  CustomButton
} from '../styles/auth.page'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

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

    if (roomRef.val().closedAt) {
      toast.error('Sala já foi encerrada.')
      return
    }

    router.push(`/rooms/${roomCode}`)
  }

  return (
    <Container>
      <Head>
        <title>Home | Letmeask</title>
        <meta
          name="description"
          content="Aprenda e compartilhe conhecimento com outras pessoas"
        />
      </Head>

      <AsideContainer>
        <div>
          <Image
            src={illustrationImg}
            alt="Ilustração simbolizando perguntas e respostas"
            width={320}
          />
        </div>

        <PageTitle>
          Toda pergunta tem
          <br />
          uma resposta.
        </PageTitle>
        <PageSubtitle>
          Aprenda e compartilhe conhecimento
          <br />
          com outras pessoas
        </PageSubtitle>
      </AsideContainer>

      <MainContainer>
        <Content>
          <div>
            <Image src={logoImg} alt="Letmeask" />
          </div>

          <CreateRoomButton onClick={handleCreateRoom}>
            <div>
              <Image src={googleIconImage} alt="Logo do Google" />
            </div>
            Crie sua sala com o Google
          </CreateRoomButton>

          <Separator>ou entre em uma sala</Separator>

          <FormContainer onSubmit={handleSubmit(handleJoinRoom)}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              {...register('roomCode')}
            />
            <CustomButton type="submit" isLoading={isSubmitting}>
              <div>
                <Image src={joinRoomIcon} alt="Entrar na sala" />
              </div>
              Entrar na sala
            </CustomButton>
          </FormContainer>
        </Content>
      </MainContainer>
    </Container>
  )
}

export default Home
