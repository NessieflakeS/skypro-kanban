import './Column.css'
import Card from '../Card/Card'
import { useState } from 'react'

const Column = ({ title, status, cards, moveCard }) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
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
          />
        ))}
      </div>
    </div>
  )
}

export default Column