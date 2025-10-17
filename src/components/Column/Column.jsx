import { useState } from 'react';
import Card from '../Card/Card';
import {
  ColumnContainer,
  ColumnTitle,
  CardsContainer,
  AnimatedBorder
} from './Column.styled';

const Column = ({ title, status, cards, moveCard, onCardClick }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
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
      {isDragOver && (
        <AnimatedBorder>
          <svg>
            <rect />
          </svg>
        </AnimatedBorder>
      )}
      
      <ColumnTitle dragOver={isDragOver}>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
            onCardClick={onCardClick}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
};

export default Column;