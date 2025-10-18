import { useState } from 'react';
import Card from '../Card/Card';
import {
  ColumnContainer,
  ColumnTitle,
  CardsContainer
} from './Column.styled';

const Column = ({ title, status, cards, moveCard }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const cardId = parseInt(e.dataTransfer.getData('cardId'));
    moveCard(cardId, status);
  };

  return (
    <ColumnContainer 
      dragOver={isDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ColumnTitle dragOver={isDragOver}>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
};

export default Column;