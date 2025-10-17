import styled from 'styled-components';

export const RegisterPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const RegisterContainer = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  padding: 40px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
`;

export const RegisterTitle = styled.h1`
  color: ${props => props.theme.textPrimary};
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 500;
`;

export const FormInput = styled.input`
  padding: 12px 16px;
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  background-color: ${props => props.theme.bgTertiary};
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.textSecondary};
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${props => props.theme.textSecondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #33399b;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.textTertiary};
  font-size: 14px;

  a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;