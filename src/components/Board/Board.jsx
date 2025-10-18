import Column from '../Column/Column';
import {
  MainContainer,
  MainBlock,
  MainContent
} from './Board.styled';

function Board() {
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
    <MainContainer>
      <div className="container">
        <MainBlock>
          <MainContent>
            {columnsData.map((column, index) => (
              <Column
                key={index}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </MainContent>
        </MainBlock>
      </div>
    </MainContainer>
  );
}

export default Board;