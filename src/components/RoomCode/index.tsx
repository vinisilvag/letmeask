import React from 'react'

import { RoomButton, ImageContainer, RoomCodeText } from './styles'

import Image from 'next/image'

import copyImg from '../../../public/copy.svg'

type RoomCodeProps = {
  code: string
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <RoomButton onClick={copyRoomCodeToClipboard}>
      <ImageContainer>
        <Image src={copyImg} alt="Copy room code" />
      </ImageContainer>

      <RoomCodeText>Sala #{code}</RoomCodeText>
    </RoomButton>
  )
}
