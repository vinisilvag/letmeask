import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  padding: 24px;
  border-bottom: 1px solid var(--navbar-border);
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 16px;

    button {
      height: 40px;
    }
  }
`

export const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
`

export const RoomTitleContainer = styled.div`
  margin: 32px 0 24px;

  display: flex;
  align-items: center;
`

export const RoomTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: var(--text-color);
`

export const QuestionNumber = styled.span`
  margin-left: 16px;
  background-color: var(--pink);
  border-radius: 9999px;
  padding: 8px 16px;
  color: var(--white);
  font-weight: 500;
  font-size: 14px;
`

export const FormContainer = styled.form``

export const Textarea = styled.textarea`
  width: 100%;
  border: 0;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--textarea);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  resize: vertical;
  min-height: 130px;
`

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

export const SignInContainer = styled.span`
  font-size: 14px;
  color: var(--gray-text);
  font-weight: 500;
`

export const SignInButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--primary);
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
  }
`

export const AuthorName = styled.span`
  margin-left: 8px;
  color: var(--text-color);
  font-weight: 500;
  font-size: 14px;
`

export const QuestionList = styled.div`
  margin-top: 32px;
`

export const NoQuestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-top: 64px;
`

export const NoQuestionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: var(--text-color);
  margin-top: 16px;
`

export const NoQuestionMessage = styled.span`
  color: var(--gray-text);
  margin-top: 8px;
  text-align: center;
  line-height: 24px;
`

export const LikeButton = styled.button<{ isLiked: boolean }>`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  color: ${props => (props.isLiked ? 'var(--primary)' : 'var(--gray-text)')};
  gap: 8px;

  svg path {
    stroke: ${props => (props.isLiked ? 'var(--primary)' : 'var(--gray-text)')};
  }
`
