import './Main.css'
import Column from '../Column/Column'

const Main = ({ cards, moveCard }) => {
  const columns = [
    { id: 1, title: "Без статуса", status: "Без статуса" },
    { id: 2, title: "Нужно сделать", status: "Нужно сделать" },
    { id: 3, title: "В работе", status: "В работе" },
    { id: 4, title: "Тестирование", status: "Тестирование" },
    { id: 5, title: "Готово", status: "Готово" }
  ]

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map(column => (
              <Column 
                key={column.id} 
                title={column.title} 
                status={column.status}
                cards={cards.filter(card => card.status === column.status)}
                moveCard={moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main