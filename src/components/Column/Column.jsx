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
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const cardId = e.dataTransfer.getData('cardId');
    const currentStatus = e.dataTransfer.getData('currentStatus');
    
    if (currentStatus !== status) {
      moveCard(cardId, status);
    }
  };

  return (
    <ColumnContainer 
      $dragOver={isDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isDragOver ? 'rgba(86, 94, 239, 0.1)' : 'transparent',
        border: isDragOver ? '2px dashed #565EEF' : '2px dashed transparent',
        borderRadius: isDragOver ? '10px' : '0',
        transition: 'all 0.3s ease'
      }}
    >
      <ColumnTitle $dragOver={isDragOver}>
        <p>{title} ({cards.length})</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map(card => (
          <Card 
            key={card._id} 
            card={card}
          />
        ))}
      </CardsContainer>
    </ColumnContainer>
  );
};

export default Column;