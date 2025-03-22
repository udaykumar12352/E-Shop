import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  button {
    background: ${({ theme }) => theme.primary};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.secondary};
    }
  }
`;

export default GlobalStyles;