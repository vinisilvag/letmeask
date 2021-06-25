import React from 'react'

import {
  Container,
  Header,
  HeaderContent,
  MainContent,
  RoomTitleContainer,
  RoomTitle,
  QuestionNumber,
  FormContainer,
  Textarea,
  FormFooter,
  SignInContainer,
  SignInButton,
  UserInfo,
  AuthorName,
  QuestionList,
  NoQuestion,
  NoQuestionTitle,
  NoQuestionMessage,
  LikeButton
} from '../../styles/room.page'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useRoom } from '../../hooks/useRoom'
import { useAuth } from '../../hooks/useAuth'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'

import { database } from '../../services/firebase'

import logoImg from '../../../public/logo.svg'
import emptyQuestionsImg from '../../../public/empty-questions.svg'

type CreateQuestionFormData = {
  newQuestion: string
}

const Room: React.FC = () => {
  const { user, signInWithGoogle } = useAuth()
  const router = useRouter()
  const { id: roomCode } = router.query

  const { questions, title } = useRoom(String(roomCode))

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<CreateQuestionFormData>()

  const handleSendQuestion: SubmitHandler<CreateQuestionFormData> =
    async data => {
      const { newQuestion } = data

      if (newQuestion.trim() === '') {
        return
      }

      if (!user) {
        throw new Error('You must be logged in')
      }

      const question = {
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatar
        },
        isHighlighted: false,
        isAnswered: false
      }

      await database.ref(`rooms/${roomCode}/questions`).push(question)

      reset({ newQuestion: '' })
    }

  const handleLikeQuestion = async (
    questionId: string,
    likeId: string | undefined
  ) => {
    if (likeId) {
      await database
        .ref(`/rooms/${roomCode}/questions/${questionId}/likes/${likeId}`)
        .remove()
    } else {
      await database
        .ref(`/rooms/${roomCode}/questions/${questionId}/likes`)
        .push({
          authorId: user.id
        })
    }
  }

  return (
    <Container>
      <Head>
        <title>{title} | Letmeask</title>
        <meta
          name="description"
          content="Aprenda e compartilhe conhecimento com outras pessoas"
        />
      </Head>

      <Header>
        <HeaderContent>
          <Image src={logoImg} alt="Letmeask" height={45} />
          <RoomCode code={String(roomCode)} />
        </HeaderContent>
      </Header>

      <MainContent>
        <RoomTitleContainer>
          <RoomTitle>{title}</RoomTitle>
          {questions.length > 0 && (
            <QuestionNumber>{questions.length} pergunta(s)</QuestionNumber>
          )}
        </RoomTitleContainer>

        <FormContainer onSubmit={handleSubmit(handleSendQuestion)}>
          <Textarea
            placeholder="O que você quer perguntar?"
            {...register('newQuestion')}
          />

          <FormFooter>
            {user ? (
              <UserInfo>
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                />
                <AuthorName>{user.name}</AuthorName>
              </UserInfo>
            ) : (
              <SignInContainer>
                Para enviar uma pergunta,{' '}
                <SignInButton type="button" onClick={signInWithGoogle}>
                  faça seu login
                </SignInButton>
                .
              </SignInContainer>
            )}

            <Button type="submit" isLoading={isSubmitting} disabled={!user}>
              Enviar pergunta
            </Button>
          </FormFooter>
        </FormContainer>

        <QuestionList>
          {questions.length === 0 ? (
            <NoQuestion>
              <Image
                src={emptyQuestionsImg}
                alt="Nenhuma pergunta foi feita"
                width={150}
                height={150}
              />

              <NoQuestionTitle>Nenhuma pergunta por aqui...</NoQuestionTitle>

              <NoQuestionMessage>
                Faça o seu login e seja a primeira pessoa a<br />
                fazer uma pergunta!
              </NoQuestionMessage>
            </NoQuestion>
          ) : (
            questions.map(question => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                {!question.isAnswered && (
                  <LikeButton
                    type="button"
                    isLiked={!!question.likeId}
                    aria-label="Marcar como gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </LikeButton>
                )}
              </Question>
            ))
          )}
        </QuestionList>
      </MainContent>
    </Container>
  )
}

export default Room
