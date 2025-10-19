import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NotFoundPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

export const NotFoundTitle = styled.h1`
  color: ${props => props.theme.textPrimary};
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const NotFoundText = styled.p`
  color: ${props => props.theme.textTertiary};
  font-size: 18px;
  margin-bottom: 30px;
  max-width: 500px;
`;

export const HomeButton = styled(Link)`
  background-color: ${props => props.theme.textSecondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #33399b;
  }
`;