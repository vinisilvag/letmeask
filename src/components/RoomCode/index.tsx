import React from 'react'

import Image from 'next/image'

import styles from './styles.module.scss'

import copyImg from '../../../public/copy.svg'

type RoomCodeProps = {
  code: string
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <Image src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{code}</span>
    </button>
  )
}
