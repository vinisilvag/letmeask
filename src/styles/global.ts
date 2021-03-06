import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #fff;
    --gray-white: #f8f8f8;
    --text-color: #29292e;
    --primary: #835afd;
    --gray: #a8a8b3;
    --gray-text: #737380;
    --red: #ea4335;
    --pink: #e559f9;
    --navbar-border: #e2e2e2;
    --textarea: #fefefe;
  }

  body {
    background-color: var(--gray-white);
    color: var(--text-color);
  }

  body,
  input,
  button,
  textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }
`
