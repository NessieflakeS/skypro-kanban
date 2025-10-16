import './Main.css'
import Column from '../Column/Column'
import SkeletonColumn from '../SkeletonColumn/SkeletonColumn'

const Main = ({ cards, moveCard, onCardClick, isLoading }) => {
  const columns = [
    { id: 1, title: "Без статуса", status: "Без статуса" },
    { id: 2, title: "Нужно сделать", status: "Нужно сделать" },
    { id: 3, title: "В работе", status: "В работе" },
    { id: 4, title: "Тестирование", status: "Тестирование" },
    { id: 5, title: "Готово", status: "Готово" }
  ]

  return (
    <main className="main">
      <div className="main__block">
        <div className="main__content">
          {isLoading ? (
            // Показываем скелетоны во время загрузки
            <>
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
            </>
          ) : (
            // Показываем реальные колонки после загрузки
            columns.map(column => (
              <Column 
                key={column.id} 
                title={column.title} 
                status={column.status}
                cards={cards.filter(card => card.status === column.status)}
                moveCard={moveCard}
                onCardClick={onCardClick}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default Main