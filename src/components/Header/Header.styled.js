import styled, { keyframes } from 'styled-components';

const dotsAnimation = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${props => props.theme.headerBg};
  padding: 0 20px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const HeaderLogo = styled.div`
  img {
    width: 85px;
    height: 20px;
  }
`;

export const HeaderNav = styled.nav`
  max-width: 500px;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NewTaskButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${props => props.theme.textSecondary};
  color: #FFFFFF;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: ${props => props.loading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.loading ? 0.7 : 1};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #33399b;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #FFFFFF;
    animation: ${dotsAnimation} 1.4s ease-in-out infinite both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
`;

export const UserContainer = styled.div`
  position: relative;
`;

export const UserButton = styled.a`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.textPrimary};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.textSecondary};
  }
`;

export const UserMenu = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: 50px;
  right: 0;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 10px 39px rgba(26, 56, 101, 0.21);
  min-width: 200px;
  z-index: 100;
`;

export const UserName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 4px;
`;

export const UserEmail = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textTertiary};
  margin-bottom: 16px;
`;

export const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  p {
    font-size: 14px;
    color: ${props => props.theme.textPrimary};
  }
`;

export const ThemeCheckbox = styled.input`
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: ${props => props.theme.bgTertiary};
  appearance: none;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${props => props.theme.textTertiary};
    transition: 0.3s ease;
  }

  &:checked::before {
    left: 12px;
    background-color: ${props => props.theme.textSecondary};
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  background: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.textSecondary};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
  }

  &:hover {
    background-color: ${props => props.theme.textSecondary};
    color: #FFFFFF;

    a {
      color: #FFFFFF;
    }
  }
`;

export const UserSkeleton = styled.div`
  width: 100px;
  height: 20px;
  background: ${props => props.theme.bgTertiary};
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;