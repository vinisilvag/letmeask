import React from 'react'

import Image from 'next/image'

import styles from './styles.module.scss'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
}

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children
}) => {
  return (
    <div className={styles.question}>
      <p>{content}</p>
      <footer>
        <div className={styles.userInfo}>
          <Image src={author.avatar} alt={author.name} width={32} height={32} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  )
}
