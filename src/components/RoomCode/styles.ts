import styled from 'styled-components'

export const RoomButton = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background-color: var(--white);
  border: 1px solid var(--primary);

  transition: filter 0.1s;

  cursor: pointer;

  display: flex;

  &:hover {
    filter: brightness(0.95);
  }
`

export const ImageContainer = styled.div`
  height: 100%;
  background-color: var(--primary);
  padding: 0 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    min-height: 20px !important;
  }
`

export const RoomCodeText = styled.span`
  display: block;
  align-self: center;
  flex: 1;
  padding: 0 16px 0 12px;
  width: 240px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`
