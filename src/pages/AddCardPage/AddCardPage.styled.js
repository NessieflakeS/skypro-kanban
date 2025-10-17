import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AddCardContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const AddCardForm = styled.form`
  background: ${props => props.theme.cardBg};
  padding: 40px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

export const AddCardTitle = styled.h1`
  color: ${props => props.theme.textPrimary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 6px;
  background: transparent;
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }

  &:focus {
    border-color: ${props => props.theme.textSecondary};
    outline: none;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 6px;
  background: transparent;
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }

  &:focus {
    border-color: ${props => props.theme.textSecondary};
    outline: none;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 6px;
  background: transparent;
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.textSecondary};
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.textSecondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #33399b;
  }
`;

export const BackButton = styled(Link)`
  padding: 12px 24px;
  background: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.textSecondary};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.textSecondary};
    color: white;
  }
`;