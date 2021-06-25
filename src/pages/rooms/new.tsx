import React from 'react'

import {
  Container,
  AsideContainer,
  PageTitle,
  PageSubtitle,
  MainContainer,
  Content,
  Title,
  FormContainer,
  Input,
  CustomButton,
  JoinRoomLink
} from '../../styles/auth.page'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SubmitHandler, useForm } from 'react-hook-form'

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

    router.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <Container>
      <Head>
        <title>Criar sala | Letmeask</title>
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

          <Title>Crie uma nova sala</Title>

          <FormContainer onSubmit={handleSubmit(handleCreateRoom)}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              {...register('newRoom')}
            />
            <CustomButton type="submit" isLoading={isSubmitting}>
              Criar sala
            </CustomButton>
          </FormContainer>

          <JoinRoomLink>
            Quer entrar em uma sala já existente?{' '}
            <Link href="/">Clique aqui</Link>
          </JoinRoomLink>
        </Content>
      </MainContainer>
    </Container>
  )
}

export default NewRoom
