import styled from 'styled-components'

export const QuestionContainer = styled.div<{
  isHighlighted: boolean
  isAnswered: boolean
}>`
  background-color: ${props =>
    props.isAnswered
      ? '#dbdcdd'
      : props.isHighlighted
      ? '#f4f0ff'
      : 'var(--textarea)'};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  border: 1px solid
    ${props => (props.isHighlighted ? 'var(--primary)' : 'var(--white)')};

  & + div {
    margin-top: 8px;
  }
`

export const QuestionContent = styled.p`
  color: var(--text-color);
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 24px;

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;

    transition: filter 0.1s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  > div + div {
    display: flex;
    gap: 16px;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
  }
`

export const AuthorName = styled.span<{ isHighlighted: boolean }>`
  margin-left: 8px;
  color: ${props =>
    props.isHighlighted ? 'var(--text-color)' : 'var(--gray-text)'};
  font-size: 14px;
`

export const ButtonsContainer = styled.div``
