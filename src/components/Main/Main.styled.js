import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100%;
  background-color: ${props => props.theme.bgPrimary};
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const MainBlock = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 40px 135px 49px 135px;
  box-sizing: border-box;
  background-color: ${props => props.theme.bgPrimary}; 

  @media (max-width: 1200px) {
    padding: 40px 20px 64px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
  gap: 19px;
  justify-content: flex-start;

  @media (max-width: 1200px) {
    gap: 15px;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;