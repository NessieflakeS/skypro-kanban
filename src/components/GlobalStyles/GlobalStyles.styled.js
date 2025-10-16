import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${props => props.theme.bgPrimary};
    transition: background-color 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }
`;