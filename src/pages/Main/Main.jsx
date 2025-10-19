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

  const getCardIdFromUrl = () => {
    if (isCardOpen) {
      const match = location.pathname.match(/\/card\/(\w+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const currentCardId = getCardIdFromUrl();
  const currentCard = cards.find(card => card._id === currentCardId);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await tasksAPI.getTasks();
      setCards(response.tasks || []);
    } catch (err) {
      setError('Ошибка при загрузке задач: ' + err.message);
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const moveCard = async (cardId, newStatus) => {
  try {
    const cardToUpdate = cards.find(card => card._id === cardId);
    if (!cardToUpdate || cardToUpdate.status === newStatus) {
      return;
    }

    const updatedCard = {
      title: cardToUpdate.title,
      topic: cardToUpdate.topic, 
      status: newStatus,
      description: cardToUpdate.description,
      date: cardToUpdate.date
    };

    await tasksAPI.updateTask(cardId, updatedCard);
    await loadTasks();
  } catch (err) {
    setError('Ошибка при обновлении задачи: ' + err.message);
    console.error('Error updating task:', err);
  }
};

  const createCard = async (newCardData) => {
  try {
    setError('');
    
    let dateISO;
    if (newCardData.date) {
      const [day, month, year] = newCardData.date.split('.');
      dateISO = new Date(`${year}-${month}-${day}`).toISOString();
    } else {
      dateISO = new Date().toISOString();
    }

    const taskData = {
      title: newCardData.title || "Новая задача",
      topic: newCardData.category || "Research",
      status: "Без статуса",
      description: newCardData.description || "",
      date: dateISO
    };

    await tasksAPI.createTask(taskData);
    await loadTasks();
    navigate('/');
  } catch (err) {
    setError('Ошибка при создании задачи: ' + err.message);
    console.error('Error creating task:', err);
  }
};

  const deleteCard = async (cardId) => {
    try {
      setError('');
      await tasksAPI.deleteTask(cardId);
      await loadTasks(); 
      navigate('/'); 
    } catch (err) {
      setError('Ошибка при удалении задачи: ' + err.message);
      console.error('Error deleting task:', err);
    }
  };

  const updateCard = async (cardId, updatedData) => {
  try {
    setError('');
    
    let dateISO;
    if (updatedData.date) {
      const [day, month, year] = updatedData.date.split('.');
      dateISO = new Date(`${year}-${month}-${day}`).toISOString();
    } else {
      dateISO = new Date().toISOString();
    }

    const taskData = {
      title: updatedData.title,
      topic: updatedData.category,
      status: updatedData.status,
      description: updatedData.description,
      date: dateISO
    };

    await tasksAPI.updateTask(cardId, taskData);
    await loadTasks();
    navigate('/');
  } catch (err) {
    setError('Ошибка при обновлении задачи: ' + err.message);
    console.error('Error updating task:', err);
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
              error={error}
            />
          )}
          
          {isCardOpen && currentCard && (
            <PopupBrowseCard 
              card={currentCard}
              onDeleteCard={deleteCard}
              onUpdateCard={updateCard}
              onClose={handleCloseModal}
              error={error}
            />
          )}
          
          {isExitOpen && (
            <PopupExit onClose={handleCloseModal} />
          )}

          <Header 
            isDarkTheme={isDarkTheme} 
            toggleTheme={toggleTheme}
            isLoading={isLoading}
            onNewCardClick={handleNewCardClick}
          />
          
          {error && (
            <div style={{ 
              color: '#ff4444', 
              textAlign: 'center', 
              padding: '10px',
              backgroundColor: '#ffeaea',
              margin: '10px 20px',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}
          
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