import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../../styles/room.module.scss'

import { useRoom } from '../../../hooks/useRoom'

import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'
import { Question } from '../../../components/Question'

import { database } from '../../../services/firebase'

import logoImg from '../../../../public/logo.svg'
import emptyQuestionsImg from '../../../../public/empty-questions.svg'
import deleteIcon from '../../../../public/delete.svg'

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

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`/rooms/${roomCode}/questions/${questionId}`).remove()
    }
  }

  return (
    <div className={styles.pageRoom}>
      <Head>
        <title>{title} | Letmeask</title>
        <meta
          name="description"
          content="Aprenda e compartilhe conhecimento com outras pessoas"
        />
      </Head>

      <header>
        <div className={styles.content}>
          <Image src={logoImg} alt="Letmeask" height={45} />

          <div>
            <RoomCode code={String(roomCode)} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.roomTitle}>
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className={styles.questionList}>
          {questions.length === 0 ? (
            <div className={styles.noQuestion}>
              <Image
                src={emptyQuestionsImg}
                alt="Nenhuma pergunta foi feita"
                width={150}
                height={150}
              />

              <h2>Nenhuma pergunta por aqui...</h2>

              <span>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </span>
            </div>
          ) : (
            questions.map(question => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <Image src={deleteIcon} alt="Remover pergunta" />
                </button>
              </Question>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom
