import React, { FormEvent, useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../styles/room.module.scss'

import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'

import { database } from '../../services/firebase'

import logoImg from '../../../public/logo.svg'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighlighted: boolean
    isAnswered: boolean
  }
>

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
}

const Room: React.FC = () => {
  const { user, signInWithGoogle } = useAuth()
  const router = useRouter()
  const { id: roomCode } = router.query

  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomCode}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom?.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        }
      )

      setTitle(databaseRoom?.title)
      setQuestions(parsedQuestions)
    })
  }, [roomCode])

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

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

    setNewQuestion('')
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
          <RoomCode code={String(roomCode)} />
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.roomTitle}>
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button type="button" onClick={signInWithGoogle}>
                  faça seu login
                </button>
                .
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {questions.toString()}
      </main>
    </div>
  )
}

export default Room
