import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/auth.module.scss'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import { Button } from '../../components/Button'

const NewRoom: React.FC = () => {
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

          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Criar sala</Button>
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
