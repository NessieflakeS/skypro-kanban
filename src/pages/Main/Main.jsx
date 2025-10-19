import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import PopupNewCard from '../../components/Popups/PopupNewCard/PopupNewCard';
import PopupBrowseCard from '../../components/Popups/PopupBrowseCard/PopupBrowseCard';
import PopupExit from '../../components/Popups/PopupExit/PopupExit';
import { GlobalStyles } from '../../GlobalStyles.styled';
import { lightTheme, darkTheme } from '../../theme';
import { MainPage, MainContent } from './Main.styled';
import { tasksAPI } from '../../api';

const MainPageComponent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  const isNewCardOpen = location.pathname === '/new-card';
  const isExitOpen = location.pathname === '/exit';
  const isCardOpen = location.pathname.startsWith('/card/');

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError('');
      const tasks = await tasksAPI.getTasks();
      setCards(tasks);
    } catch (err) {
      setError('Ошибка загрузки задач: ' + err.message);
      console.error('Failed to load tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getCardIdFromUrl = () => {
    if (isCardOpen) {
      const match = location.pathname.match(/\/card\/(\d+)/);
      return match ? parseInt(match[1]) : null;
    }
    return null;
  };

  const currentCardId = getCardIdFromUrl();
  const currentCard = cards.find(card => card.id === currentCardId);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const moveCard = async (cardId, newStatus) => {
    try {
      const cardToUpdate = cards.find(card => card.id === cardId);
      if (cardToUpdate) {
        await tasksAPI.updateTask(cardId, {
          ...cardToUpdate,
          status: newStatus
        });
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === cardId ? { ...card, status: newStatus } : card
          )
        );
      }
    } catch (err) {
      setError('Ошибка обновления задачи: ' + err.message);
      console.error('Failed to update task:', err);
    }
  };

  const createCard = async (newCardData) => {
    try {
      setError('');
      const newCard = await tasksAPI.createTask({
        title: newCardData.title || "Новая задача",
        category: newCardData.category || "Web Design",
        date: newCardData.date || new Date().toLocaleDateString('ru-RU'),
        status: "Без статуса",
        description: newCardData.description || ""
      });
      
      setCards(prevCards => [...prevCards, newCard]);
      navigate('/');
    } catch (err) {
      setError('Ошибка создания задачи: ' + err.message);
      console.error('Failed to create task:', err);
      throw err;
    }
  };

  const deleteCard = async (cardId) => {
    try {
      setError('');
      await tasksAPI.deleteTask(cardId);
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      navigate('/');
    } catch (err) {
      setError('Ошибка удаления задачи: ' + err.message);
      console.error('Failed to delete task:', err);
    }
  };

  const updateCard = async (cardId, updatedData) => {
    try {
      setError('');
      await tasksAPI.updateTask(cardId, updatedData);
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === cardId ? { ...card, ...updatedData } : card
        )
      );
      navigate('/');
    } catch (err) {
      setError('Ошибка обновления задачи: ' + err.message);
      console.error('Failed to update task:', err);
      throw err; 
    }
  };

  const handleNewCardClick = () => {
    navigate('/new-card');
  };

  const handleCloseModal = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <MainPage>
        <MainContent>
          {isNewCardOpen && (
            <PopupNewCard 
              onCreateCard={createCard}
              onClose={handleCloseModal}
            />
          )}
          
          {isCardOpen && currentCard && (
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

          {error && (
            <div style={{ 
              color: 'red', 
              textAlign: 'center', 
              padding: '10px',
              backgroundColor: '#ffe6e6',
              margin: '10px',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}

          <Header 
            isDarkTheme={isDarkTheme} 
            toggleTheme={toggleTheme}
            isLoading={isLoading}
            onNewCardClick={handleNewCardClick}
          />
          <Main 
            cards={cards} 
            moveCard={moveCard}
            isLoading={isLoading}
          />
        </MainContent>
      </MainPage>
    </ThemeProvider>
  );
};

export default MainPageComponent;