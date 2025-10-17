import { useState, useRef, useEffect } from 'react';
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
          {!isDarkTheme ? (
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo.png" alt="logo" />
            </a>
          ) : (
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo_dark.png" alt="logo" />
            </a>
          )}
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
              <UserSkeleton variant="text" />
            ) : (
              <UserButton 
                ref={userButtonRef}
                href="#user-set-target"
                onClick={(e) => {
                  e.preventDefault();
                  toggleUserMenu();
                }}
              >
                Ivan Ivanov
              </UserButton>
            )}
            <UserMenu 
              ref={menuRef}
              isOpen={isUserMenuOpen}
              id="user-set-target"
            >
              <UserName>Ivan Ivanov</UserName>
              <UserEmail>ivan.ivanov@gmail.com</UserEmail>
              <ThemeToggle>
                <p>Темная тема</p>
                <ThemeCheckbox 
                  type="checkbox" 
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                />
              </ThemeToggle>
              <LogoutButton type="button" onClick={handleLogoutClick}>
                <a href="#popExit">Выйти</a>
              </LogoutButton>
            </UserMenu>
          </UserContainer>
        </HeaderNav>					
      </HeaderBlock>			
    </HeaderContainer>
  );
};

export default Header;