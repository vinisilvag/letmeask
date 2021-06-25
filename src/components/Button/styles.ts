import styled from 'styled-components'

export const CustomButton = styled.button<{ outlined: boolean }>`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background-color: ${props =>
    props.outlined ? 'var(--white)' : 'var(--primary)'};
  color: ${props => (props.outlined ? 'var(--primary)' : 'var(--white)')};
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: ${props => (props.outlined ? '1px solid var(--primary)' : 0)};

  transition: filter 0.1s;

  div {
    margin-right: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
