import Column from '../Column/Column';
import SkeletonColumn from '../SkeletonColumn/SkeletonColumn';
import {
  MainContainer,
  MainBlock,
  MainContent
} from './Main.styled';

const Main = ({ cards, moveCard, isLoading }) => {
  const columns = [
    { id: 1, title: "Без статуса", status: "Без статуса" },
    { id: 2, title: "Нужно сделать", status: "Нужно сделать" },
    { id: 3, title: "В работе", status: "В работе" },
    { id: 4, title: "Тестирование", status: "Тестирование" },
    { id: 5, title: "Готово", status: "Готово" }
  ];

  const totalTasks = cards.length;

  return (
    <MainContainer>
      <MainBlock>
        <MainContent>
          {isLoading ? (
            <>
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
            </>
          ) : totalTasks === 0 ? (
            <div style={{ 
              width: '100%', 
              textAlign: 'center', 
              padding: '60px 20px',
              color: '${props => props.theme.textTertiary}',
              fontSize: '16px'
            }}>
              <p>Задачи не найдены</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                Создайте первую задачу, нажав на кнопку "Создать новую задачу"
              </p>
            </div>
          ) : (
            columns.map(column => (
              <Column 
                key={column.id} 
                title={column.title} 
                status={column.status}
                cards={cards.filter(card => card.status === column.status)}
                moveCard={moveCard}
              />
            ))
          )}
        </MainContent>
      </MainBlock>
    </MainContainer>
  );
};

export default Main;