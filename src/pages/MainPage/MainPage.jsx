import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import {
  MainPageContainer
} from './MainPage.styled';

const MainPage = ({ isDarkTheme, toggleTheme, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialCards = [
        { id: 1, title: "Название задачи 1", category: "Web Design", date: "15.09.25", status: "Без статуса", description: "Описание задачи 1" },
        { id: 2, title: "Название задачи 2", category: "Research", date: "20.09.25", status: "Без статуса", description: "Описание задачи 2" },
        { id: 3, title: "Название задачи 3", category: "Copywriting", date: "25.09.25", status: "Нужно сделать", description: "Описание задачи 3" },
        { id: 4, title: "Название задачи 4", category: "Copywriting", date: "10.09.25", status: "В работе", description: "Описание задачи 4" },
        { id: 5, title: "Название задачи 5", category: "Research", date: "28.09.25", status: "Тестирование", description: "Описание задачи 5" },
        { id: 6, title: "Название задачи 6", category: "Research", date: "05.09.25", status: "Готово", description: "Описание задачи 6" }
      ];
      setCards(initialCards);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const moveCard = (cardId, newStatus) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, status: newStatus } : card
      )
    );
  };

  const createCard = (newCardData) => {
    const newCard = {
      id: Date.now(),
      title: newCardData.title || "Новая задача",
      category: newCardData.category || "Web Design",
      date: newCardData.date || new Date().toLocaleDateString('ru-RU'),
      status: "Без статуса",
      description: newCardData.description || ""
    };
    setCards(prevCards => [...prevCards, newCard]);
  };

  const deleteCard = (cardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const selectCard = (card) => {
    navigate(`/card/${card.id}`);
  };

  const updateCard = (cardId, updatedData) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, ...updatedData } : card
      )
    );
  };

  const handleNewCardClick = () => {
    navigate('/add');
  };

  return (
    <MainPageContainer>
      <Header 
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        onNewCardClick={handleNewCardClick}
        isLoading={isLoading}
        onLogout={onLogout}
      />
      <Main 
        cards={cards} 
        moveCard={moveCard}
        onCardClick={selectCard}
        isLoading={isLoading}
      />
    </MainPageContainer>
  );
};

export default MainPage;