import { Link } from 'react-router-dom';
import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundTitle,
  NotFoundMessage,
  HomeLink
} from './NotFoundPage.styled';

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundMessage>Страница не найдена</NotFoundMessage>
        <HomeLink to="/">Вернуться на главную</HomeLink>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFoundPage;