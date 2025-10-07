import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import PopupNewCard from './components/Popups/PopupNewCard/PopupNewCard'
import PopupBrowseCard from './components/Popups/PopupBrowseCard/PopupBrowseCard'
import Loader from './components/Loader/Loader'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const initialCards = [
        { id: 1, title: "Название задачи", category: "Web Design", date: "15.09.25", status: "Без статуса", description: "" },
        { id: 2, title: "Название задачи", category: "Research", date: "20.09.25", status: "Без статуса", description: "" },
        { id: 3, title: "Название задачи", category: "Copywriting", date: "25.09.25", status: "Нужно сделать", description: "" },
        { id: 4, title: "Название задачи", category: "Copywriting", date: "10.09.25", status: "В работе", description: "" },
        { id: 5, title: "Название задачи", category: "Research", date: "28.09.25", status: "Тестирование", description: "" },
        { id: 6, title: "Название задачи", category: "Research", date: "05.09.25", status: "Готово", description: "" }
      ];
      setCards(initialCards);
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

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
      title: newCardData.title,
      category: newCardData.category,
      date: newCardData.date,
      status: "Без статуса",
      description: newCardData.description
    };
    setCards(prevCards => [...prevCards, newCard]);
  };

  const deleteCard = (cardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    setSelectedCard(null);
  };

  const selectCard = (card) => {
    setSelectedCard(card);
  };

  const updateCard = (cardId, updatedData) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, ...updatedData } : card
      )
    );
    setSelectedCard(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`wrapper ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <PopupNewCard onCreateCard={createCard} />
      <PopupBrowseCard 
        card={selectedCard} 
        onDeleteCard={deleteCard}
        onUpdateCard={updateCard}
        onClose={() => setSelectedCard(null)}
      />

      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <Main 
        cards={cards} 
        moveCard={moveCard}
        onCardClick={selectCard}
      />
    </div>
  )
}

export default App