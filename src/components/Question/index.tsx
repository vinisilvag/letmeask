import React from 'react'

import {
  QuestionContainer,
  QuestionContent,
  UserInfo,
  Footer,
  AuthorName,
  ButtonsContainer
} from './styles'

import Image from 'next/image'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  isAnswered?: boolean
  isHighlighted?: boolean
}

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children
}) => {
  return (
    <QuestionContainer
      isAnswered={isAnswered}
      isHighlighted={isHighlighted && !isAnswered}
    >
      <QuestionContent>{content}</QuestionContent>
      <Footer>
        <UserInfo>
          <Image src={author.avatar} alt={author.name} width={32} height={32} />
          <AuthorName isHighlighted={isHighlighted}>{author.name}</AuthorName>
        </UserInfo>

        <ButtonsContainer>{children}</ButtonsContainer>
      </Footer>
    </QuestionContainer>
  )
}
