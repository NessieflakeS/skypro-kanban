import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  padding: 20px;
`;

export const NotFoundContent = styled.div`
  text-align: center;
`;

export const NotFoundTitle = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 20px;
  line-height: 1;
`;

export const NotFoundMessage = styled.p`
  font-size: 24px;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 30px;
`;

export const HomeLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background-color: ${props => props.theme.textSecondary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #33399b;
  }
`;