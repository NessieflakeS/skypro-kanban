import styled from 'styled-components';

export const MainPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;