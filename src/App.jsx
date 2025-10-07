import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import PopupExit from './components/Popups/PopupExit/PopupExit'
import PopupNewCard from './components/Popups/PopupNewCard/PopupNewCard'
import PopupBrowseCard from './components/Popups/PopupBrowseCard/PopupBrowseCard'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, title: "Название задачи", category: "Web Design", date: "15.09.25", status: "Без статуса" },
    { id: 2, title: "Название задачи", category: "Research", date: "20.09.25", status: "Без статуса" },
    { id: 3, title: "Название задачи", category: "Copywriting", date: "25.09.25", status: "Нужно сделать" },
    { id: 4, title: "Название задачи", category: "Copywriting", date: "10.09.25", status: "В работе" },
    { id: 5, title: "Название задачи", category: "Research", date: "28.09.25", status: "Тестирование" },
    { id: 6, title: "Название задачи", category: "Research", date: "05.09.25", status: "Готово" }
  ]);

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

  return (
    <div className={`wrapper ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <PopupExit />
      <PopupNewCard />
      <PopupBrowseCard />

      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <Main cards={cards} moveCard={moveCard} />
    </div>
  )
}

export default App