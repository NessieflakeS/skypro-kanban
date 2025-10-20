import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const navigate = useNavigate();

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
    if (!isLoading) {
      navigate('/new-card');
    }
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    navigate('/exit');
    setIsUserMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderBlock>
        <HeaderLogo>
          <Link to="/" onClick={handleLogoClick}>
            <img 
              src={isDarkTheme ? "/images/logo_dark.png" : "/images/logo.png"} 
              alt="logo" 
            />
          </Link>
        </HeaderLogo>
        <HeaderNav>
          <NewTaskButton 
            onClick={handleNewCardClick}
            $loading={isLoading}
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
              $isOpen={isUserMenuOpen}
              id="user-set-target"
            >
              <UserName>{currentUser?.name || 'User'}</UserName>
              <UserEmail>{currentUser?.email || 'user@example.com'}</UserEmail>
              <ThemeToggle>
                <p>Темная тема</p>
                <ThemeCheckbox 
                  type="checkbox" 
                  checked={isDarkTheme}
                  onChange={handleThemeToggle}
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