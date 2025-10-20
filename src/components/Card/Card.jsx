import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardItem,
  CardContainer,
  CardGroup,
  CardTheme,
  CardButton,
  CardDot,
  CardTitle,
  CardContent,
  CardDate
} from './Card.styled';

const Card = ({ card, dragging = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const menuButtonRef = useRef(null);

  if (!card || !card._id) {
    console.error('Invalid card in Card component:', card);
    return null;
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('cardId', card._id.toString());
    e.dataTransfer.setData('currentStatus', card.status);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCardClick = (e) => {
    if (menuButtonRef.current && menuButtonRef.current.contains(e.target)) {
      return;
    }
    
    if (card && card._id) {
      navigate(`/card/${card._id}`);
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setTimeout(() => {
      if (card && card._id) {
        navigate(`/card/${card._id}`);
      }
    }, 10);
  };

  const themeClass = getThemeClass(card.topic);
  const themeText = getThemeText(card.topic);

  function getThemeClass(topic) {
    const themes = {
      'Web Design': 'orange',
      'Research': 'green',
      'Copywriting': 'purple'
    };
    return themes[topic] || 'green';
  }

  function getThemeText(topic) {
    const texts = {
      'Web Design': 'Web Design',
      'Research': 'Research',
      'Copywriting': 'Copywriting'
    };
    return texts[topic] || 'Research';
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <CardItem 
      $dragging={isDragging || dragging}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardContainer $dragging={isDragging} onClick={handleCardClick}>
        <CardGroup>
          <CardTheme $themeColor={themeClass}>
            <p>{themeText}</p>
          </CardTheme>
          <CardButton 
            ref={menuButtonRef}
            onClick={handleMenuClick}
          >
            <CardDot />
            <CardDot />
            <CardDot />
          </CardButton>
        </CardGroup>
        <CardContent>
          <CardTitle>{card.title}</CardTitle>
          <CardDate>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <g clipPath="url(#clip0_1_415)">
                <path 
                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" 
                  strokeWidth="0.8" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z" 
                  strokeWidth="0.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </g>
              <defs>
                <clipPath id="clip0_1_415">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{formatDate(card.date)}</p>
          </CardDate>
        </CardContent>
      </CardContainer>
    </CardItem>
  );
};

export default Card;