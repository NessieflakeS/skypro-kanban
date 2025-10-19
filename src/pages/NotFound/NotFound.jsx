import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../GlobalStyles.styled';
import { lightTheme } from '../../theme';
import {
  NotFoundPage,
  NotFoundTitle,
  NotFoundText,
  HomeButton
} from './NotFound.styled';

const NotFound = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <NotFoundPage>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundText>
          Страница, которую вы ищете, не существует или была перемещена.
        </NotFoundText>
        <HomeButton to="/">
          Вернуться на главную
        </HomeButton>
      </NotFoundPage>
    </ThemeProvider>
  );
};

export default NotFound;