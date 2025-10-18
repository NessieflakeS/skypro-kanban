import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import PopupNewCard from '../../components/Popups/PopupNewCard/PopupNewCard';
import PopupBrowseCard from '../../components/Popups/PopupBrowseCard/PopupBrowseCard';
import PopupExit from '../../components/Popups/PopupExit/PopupExit';
import { GlobalStyles } from '../../GlobalStyles.styled';
import { lightTheme, darkTheme } from '../../theme';
import { MainPage, MainContent } from './Main.styled';

const MainPageComponent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  const isNewCardOpen = location.pathname === '/new-card';
  const isExitOpen = location.pathname === '/exit';
  const isCardOpen = location.pathname.startsWith('/card/');

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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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
    navigate('/'); 
  };

  const deleteCard = (cardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    setSelectedCard(null);
    navigate('/'); 
  };

  const selectCard = (card) => {
    setSelectedCard(card);
    navigate(`/card/${card.id}`);
  };

  const updateCard = (cardId, updatedData) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, ...updatedData } : card
      )
    );
    setSelectedCard(null);
    navigate('/'); 
  };

  const handleNewCardClick = () => {
    navigate('/new-card'); 
  };

  const handleCloseModal = () => {
    navigate('/'); 
  };

  const getCardIdFromUrl = () => {
    if (isCardOpen) {
      const match = location.pathname.match(/\/card\/(\d+)/);
      return match ? parseInt(match[1]) : null;
    }
    return null;
  };

  const currentCardId = getCardIdFromUrl();
  const currentCard = cards.find(card => card.id === currentCardId);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <MainPage>
        <MainContent>
          {/* Модальные окна, которые показываются по маршрутам */}
          {isNewCardOpen && (
            <PopupNewCard 
              onCreateCard={createCard}
              onClose={handleCloseModal}
            />
          )}
          
          {isCardOpen && (
            <PopupBrowseCard 
              card={currentCard}
              onDeleteCard={deleteCard}
              onUpdateCard={updateCard}
              onClose={handleCloseModal}
            />
          )}
          
          {isExitOpen && (
            <PopupExit onClose={handleCloseModal} />
          )}

          {/* Outlet для вложенных маршрутов */}
          <Outlet />
          
          <Header 
            isDarkTheme={isDarkTheme} 
            toggleTheme={toggleTheme}
            isLoading={isLoading}
            onNewCardClick={handleNewCardClick}
          />
          <Main 
            cards={cards} 
            moveCard={moveCard}
            onCardClick={selectCard}
            isLoading={isLoading}
          />
        </MainContent>
      </MainPage>
    </ThemeProvider>
  );
};

export default MainPageComponent;