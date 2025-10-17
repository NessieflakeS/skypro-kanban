import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardPageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  padding: 40px 20px;
`;

export const CardContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${props => props.theme.cardBg};
  padding: 40px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h1`
  color: ${props => props.theme.textPrimary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

export const CardField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardLabel = styled.span`
  color: ${props => props.theme.textTertiary};
  font-size: 14px;
  font-weight: 600;
`;

export const CardValue = styled.span`
  color: ${props => props.theme.textPrimary};
  font-size: 16px;
  padding: 12px;
  background: ${props => props.theme.bgTertiary};
  border-radius: 6px;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: 1px solid ${props => props.theme.textSecondary};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.textSecondary};
    color: white;
  }
`;