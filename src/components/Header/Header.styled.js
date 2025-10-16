import styled, { keyframes } from 'styled-components';
import { SkeletonElement } from '../SkeletonCard/SkeletonCard.styled';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.headerBg};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderBlock = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 135px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 0 20px;
  }
`;

export const HeaderLogo = styled.div`
  display: block;
  
  img {
    width: 85px;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 103px;
  position: relative;

  @media (max-width: 1200px) {
    gap: 20px;
  }
`;

export const UserContainer = styled.div`
  position: relative;
`;

export const UserButton = styled.a`
  color: #565EEF;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-decoration: none;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565EEF;
    border-bottom: 1.9px solid #565EEF;
    transform: rotate(-45deg);
    margin: -2px 0 0 8px;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #33399b;
    background-color: ${props => props.theme.bgSecondary};
    
    &::after {
      border-left-color: #33399b;
      border-bottom-color: #33399b;
    }
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: ${props => props.theme.bgSecondary};
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 5px;
`;

export const UserName = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const UserEmail = styled.p`
  color: ${props => props.theme.textTertiary};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  color: ${props => props.theme.textPrimary};
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }
`;

export const ThemeCheckbox = styled.input`
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #EAEEF6;
  outline: none;
  appearance: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94A6BE;
    transition: 0.3s;
  }

  &:checked::before {
    left: 12px;
    background-color: #FFFFFF;
  }

  &:checked {
    background: #4CAF50;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  color: #565EEF;
  border-radius: 4px;
  border: 1px solid #565EEF;
  cursor: pointer;
  transition: all 0.3s ease;

  a {
    color: #565EEF;
    text-decoration: none;
  }

  &:hover {
    background-color: #33399b;
    color: #FFFFFF;
    
    a {
      color: #FFFFFF;
    }
  }
`;

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1);
  }
`;

export const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
    animation: ${bounce} 1.4s infinite ease-in-out both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
`;

export const UserSkeleton = styled(SkeletonElement)`
  width: 120px;
  height: 30px;
  border-radius: 4px;
`;