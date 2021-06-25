import styled from 'styled-components'
import { Button } from '../components/Button'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`

export const AsideContainer = styled.aside`
  flex: 7;

  background-color: var(--primary);
  color: var(--white);

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 120px 80px;
`

export const PageTitle = styled.strong`
  font: 700 42px 'Poppins', sans-serif;
  line-height: 52px;
  margin-top: 16px;
`

export const PageSubtitle = styled.p`
  font-size: 26px;
  line-height: 32px;
  margin-top: 16px;
  color: var(--gray-white);
  opacity: 0.7;
`

export const MainContainer = styled.main`
  flex: 10;

  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 320px;

  align-items: stretch;
  text-align: center;
`

export const Title = styled.h2`
  font-size: 24px;
  margin: 48px 0 24px;
  font-family: 'Poppins', sans-serif;
`

export const CreateRoomButton = styled.button`
  margin-top: 48px;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background-color: var(--red);
  color: var(--white);

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;

  transition: filter 0.1s;

  div {
    margin-right: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    filter: brightness(0.9);
  }
`

export const Separator = styled.div`
  font-size: 14px;
  color: var(--gray);

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--gray);
    margin-right: 16px;
  }

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--gray);
    margin-left: 16px;
  }
`

export const FormContainer = styled.form``

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 0 16px;
  background-color: var(--white);
  border: 1px solid var(--gray);
`

export const CustomButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`

export const JoinRoomLink = styled.p`
  font-size: 14px;
  color: var(--gray-text);
  margin-top: 16px;

  a {
    color: var(--pink);
  }
`
