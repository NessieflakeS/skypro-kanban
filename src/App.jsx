import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './AppRoutes';
import { GlobalStyles } from './GlobalStyles.styled';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <AppRoutes 
          isAuth={isAuth}
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;