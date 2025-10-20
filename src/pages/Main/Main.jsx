import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTasks } from '../../context/TaskContext';
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
  
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    moveTask,
    setError 
  } = useTasks();
  
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
  const currentCard = tasks.find(task => task._id === currentCardId);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleCreateCard = async (newCardData) => {
    let dateISO;
    if (newCardData.date) {
      const [day, month, year] = newCardData.date.split('.');
      dateISO = new Date(year, month - 1, day).toISOString();
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

    const result = await createTask(taskData);
    if (result.success) {
      navigate('/');
    }
  };

  const handleUpdateCard = async (cardId, updatedData) => {
    let dateISO;
    if (updatedData.date) {
      const [day, month, year] = updatedData.date.split('.');
      dateISO = new Date(year, month - 1, day).toISOString();
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

    const result = await updateTask(cardId, taskData);
    if (result.success) {
      navigate('/');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (cardId && cardId !== 'undefined') {
      const result = await deleteTask(cardId);
      if (result.success) {
        navigate('/');
      }
    } else {
      setError('Неверный идентификатор задачи');
    }
  };

  const handleMoveCard = async (cardId, newStatus) => {
    await moveTask(cardId, newStatus);
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
              onCreateCard={handleCreateCard}
              onClose={handleCloseModal}
              error={error}
            />
          )}
          
          {isCardOpen && currentCard && (
            <PopupBrowseCard 
              card={currentCard}
              onDeleteCard={handleDeleteCard}
              onUpdateCard={handleUpdateCard}
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
            isLoading={loading}
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
            cards={tasks} 
            moveCard={handleMoveCard}
            isLoading={loading}
          />
        </MainContent>
      </MainPage>
    </ThemeProvider>
  );
};

export default MainPageComponent;