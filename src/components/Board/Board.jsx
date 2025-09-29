import './Board.css';
import Column from '../Column/Column';

function Board() {
  // Пример данных - в реальном приложении это будет приходить из state/props
  const columnsData = [
    {
      title: "Без статуса",
      cards: [
        { theme: "_orange", title: "Название задачи", date: "30.10.23" },
        { theme: "_green", title: "Название задачи", date: "30.10.23" },
        { theme: "_orange", title: "Название задачи", date: "30.10.23" },
        { theme: "_purple", title: "Название задачи", date: "30.10.23" },
        { theme: "_orange", title: "Название задачи", date: "30.10.23" }
      ]
    },
    {
      title: "Нужно сделать",
      cards: [
        { theme: "_green", title: "Название задачи", date: "30.10.23" }
      ]
    },
    {
      title: "В работе",
      cards: [
        { theme: "_green", title: "Название задачи", date: "30.10.23" },
        { theme: "_purple", title: "Название задачи", date: "30.10.23" },
        { theme: "_orange", title: "Название задачи", date: "30.10.23" }
      ]
    },
    {
      title: "Тестирование",
      cards: [
        { theme: "_green", title: "Название задачи", date: "30.10.23" }
      ]
    },
    {
      title: "Готово",
      cards: [
        { theme: "_green", title: "Название задачи", date: "30.10.23" }
      ]
    }
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columnsData.map((column, index) => (
              <Column
                key={index}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Board;