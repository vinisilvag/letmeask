import React from 'react'

import {
  Container,
  Header,
  HeaderContent,
  MainContent,
  RoomTitleContainer,
  RoomTitle,
  QuestionNumber,
  QuestionList,
  NoQuestion,
  NoQuestionTitle,
  NoQuestionMessage
} from '../../../styles/room.page'

import { parseCookies } from 'nookies'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useRoom } from '../../../hooks/useRoom'

import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'
import { Question } from '../../../components/Question'

import { database } from '../../../services/firebase'

import logoImg from '../../../../public/logo.svg'
import emptyQuestionsImg from '../../../../public/empty-questions.svg'
import deleteIcon from '../../../../public/delete.svg'
import checkImg from '../../../../public/check.svg'
import answerImg from '../../../../public/answer.svg'

const AdminRoom: React.FC = () => {
  const router = useRouter()
  const { id: roomCode } = router.query

  const { questions, title } = useRoom(String(roomCode))

  const handleEndRoom = async () => {
    if (window.confirm('Tem certeza que você deseja encerrar esta sala?')) {
      await database.ref(`/rooms/${roomCode}`).update({
        closedAt: new Date()
      })

      router.push('/')
    }
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`/rooms/${roomCode}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  const handleHighlightQuestion = async (
    questionId: string,
    isHighlighted: boolean
  ) => {
    if (isHighlighted) {
      await database.ref(`/rooms/${roomCode}/questions/${questionId}`).update({
        isHighlighted: false
      })
    } else {
      await database.ref(`/rooms/${roomCode}/questions/${questionId}`).update({
        isHighlighted: true
      })
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`/rooms/${roomCode}/questions/${questionId}`).remove()
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

          <div>
            <RoomCode code={String(roomCode)} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </HeaderContent>
      </Header>

      <MainContent>
        <RoomTitleContainer>
          <RoomTitle>{title}</RoomTitle>
          {questions.length > 0 && (
            <QuestionNumber>{questions.length} pergunta(s)</QuestionNumber>
          )}
        </RoomTitleContainer>

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
                Envie o código desta sala para seus amigos e<br />
                comece a responder perguntas!
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
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <Image
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleHighlightQuestion(
                          question.id,
                          question.isHighlighted
                        )
                      }
                    >
                      <Image src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <Image src={deleteIcon} alt="Remover pergunta" />
                </button>
              </Question>
            ))
          )}
        </QuestionList>
      </MainContent>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params
  const { 'letmeask.loggedId': loggedId } = parseCookies(context)
  const roomRef = await database.ref(`rooms/${id}`).get()

  if (roomRef.val().authorId !== loggedId) {
    return {
      redirect: {
        destination: `/rooms/${id}`,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default AdminRoom
