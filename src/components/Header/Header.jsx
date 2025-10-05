import './Header.css'
import { useState, useRef, useEffect } from 'react'

const Header = ({ isDarkTheme, toggleTheme }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const userButtonRef = useRef(null)

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          userButtonRef.current && !userButtonRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className={`header__logo ${!isDarkTheme ? '_show' : '_hide'}`}>
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </div>
          <div className={`header__logo ${isDarkTheme ? '_show' : '_hide'}`}>
            <a href="" target="_self" rel="noopener noreferrer">
              <img src="/images/logo_dark.png" alt="logo" />
            </a>
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new _hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>
            <a 
              ref={userButtonRef}
              href="#user-set-target" 
              className="header__user _hover02"
              onClick={(e) => {
                e.preventDefault()
                toggleUserMenu()
              }}
            >
              Ivan Ivanov
            </a>
            <div 
              ref={menuRef}
              className={`header__pop-user-set pop-user-set ${isUserMenuOpen ? 'active' : ''}`} 
              id="user-set-target"
            >
              <p className="pop-user-set__name">Ivan Ivanov</p>
              <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
              <div className="pop-user-set__theme">
                <p>Темная тема</p>
                <input 
                  type="checkbox" 
                  className="checkbox" 
                  name="checkbox" 
                  checked={isDarkTheme}
                  onChange={toggleTheme}
                />
              </div>
              <button type="button" className="_hover03">
                <a href="#popExit">Выйти</a>
              </button>
            </div>
          </nav>					
        </div>
      </div>			
    </header>
  )
}

export default Header