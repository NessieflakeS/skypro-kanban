import { useParams } from 'react-router-dom';
import {
  CardPageContainer,
  CardContent,
  CardTitle,
  CardInfo,
  CardField,
  CardLabel,
  CardValue,
  BackButton
} from './CardPage.styled';

const CardPage = () => {
  const { id } = useParams();
  
  const card = {
    id: parseInt(id),
    title: `Задача ${id}`,
    category: "Web Design",
    date: "20.09.25",
    status: "В работе",
    description: `Это описание задачи ${id}. Здесь будет подробная информация о задаче.`
  };

  return (
    <CardPageContainer>
      <CardContent>
        <CardTitle>Просмотр задачи #{id}</CardTitle>
        
        <CardInfo>
          <CardField>
            <CardLabel>Название задачи:</CardLabel>
            <CardValue>{card.title}</CardValue>
          </CardField>
          
          <CardField>
            <CardLabel>Категория:</CardLabel>
            <CardValue>{card.category}</CardValue>
          </CardField>
          
          <CardField>
            <CardLabel>Дата:</CardLabel>
            <CardValue>{card.date}</CardValue>
          </CardField>
          
          <CardField>
            <CardLabel>Статус:</CardLabel>
            <CardValue>{card.status}</CardValue>
          </CardField>
          
          <CardField>
            <CardLabel>Описание:</CardLabel>
            <CardValue>{card.description}</CardValue>
          </CardField>
        </CardInfo>
        
        <BackButton to="/">← Назад к доске</BackButton>
      </CardContent>
    </CardPageContainer>
  );
};

export default CardPage;