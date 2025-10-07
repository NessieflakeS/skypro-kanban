import './Column.css'
import Card from '../Card/Card'
import { useState } from 'react'

const Column = ({ title, status, cards, moveCard, onCardClick }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [setDropPosition] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
    
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const cardHeight = 120
    const position = Math.floor(y / cardHeight)
    
    setDropPosition(position)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    setDropPosition(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    setDropPosition(null)
    const cardId = parseInt(e.dataTransfer.getData('cardId'))
    moveCard(cardId, status)
  }

  return (
    <div 
      className={`main__column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
            moveCard={moveCard}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  )
}

export default Column