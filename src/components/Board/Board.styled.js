import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100%;
  background-color: ${props => props.theme.bgPrimary};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
  background-color: ${props => props.theme.bgPrimary};

  @media screen and (max-width: 1200px) {
    padding: 40px 0 64px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
  background-color: ${props => props.theme.bgPrimary};
  gap: 20px;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;