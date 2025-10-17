import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  HeaderContainer,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  UserContainer,
  NewTaskButton,
  UserButton,
  UserMenu,
  UserName,
  UserEmail,
  ThemeToggle,
  ThemeCheckbox,
  LogoutButton,
  LoadingDots,
  UserSkeleton
} from './Header.styled';

const Header = ({ isDarkTheme, toggleTheme, onNewCardClick, isLoading }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userButtonRef = useRef(null);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          userButtonRef.current && !userButtonRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    if (!isLoading) {
      setIsUserMenuOpen(!isUserMenuOpen);
    }
  };

  const handleNewCardClick = (e) => {
    e.preventDefault();
    if (onNewCardClick && !isLoading) {
      onNewCardClick();
    }
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    window.location.hash = '#popExit';
    setIsUserMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderBlock>
        <HeaderLogo>
          <a href="/" target="_self" rel="noopener noreferrer">
            <img 
              src={isDarkTheme ? "/images/logo_dark.png" : "/images/logo.png"} 
              alt="logo" 
            />
          </a>
        </HeaderLogo>
        <HeaderNav>
          <NewTaskButton 
            onClick={handleNewCardClick}
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            ) : (
              "Создать новую задачу"
            )}
          </NewTaskButton>
          <UserContainer>
            {isLoading ? (
              <UserSkeleton />
            ) : (
              <UserButton 
                ref={userButtonRef}
                href="#user-set-target"
                onClick={(e) => {
                  e.preventDefault();
                  toggleUserMenu();
                }}
              >
                {currentUser?.name || 'User'}
              </UserButton>
            )}
            <UserMenu 
              ref={menuRef}
              isOpen={isUserMenuOpen}
              id="user-set-target"
            >
              <UserName>{currentUser?.name || 'User'}</UserName>
              <UserEmail>{currentUser?.email || 'user@example.com'}</UserEmail>
              <ThemeToggle>
                <p>Темная тема</p>
                <ThemeCheckbox 
                  type="checkbox" 
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                />
              </ThemeToggle>
              <LogoutButton type="button" onClick={handleLogoutClick}>
                Выйти
              </LogoutButton>
            </UserMenu>
          </UserContainer>
        </HeaderNav>					
      </HeaderBlock>			
    </HeaderContainer>
  );
};

export default Header;