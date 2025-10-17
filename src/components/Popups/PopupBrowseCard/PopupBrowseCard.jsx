import { useState, useEffect } from 'react';
import Calendar from '../../Common/Calendar/Calendar';
import Button from '../../Common/Button/Button';
import {
  PopupContainer,
  PopupOverlay,
  PopupBlock,
  PopupContent,
  PopupTopBlock,
  PopupTitle,
  CategoryBadge,
  StatusSection,
  StatusTitle,
  StatusThemes,
  StatusTheme,
  PopupWrap,
  PopupForm,
  FormBlock,
  FormLabel,
  FormTextarea,
  EditInput,
  ButtonsContainer,
  ButtonGroup,
  CategoriesSection
} from './PopupBrowseCard.styled';

const PopupBrowseCard = ({ card, onDeleteCard, onUpdateCard, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (card) {
      setEditData(card);
    }
  }, [card]);

  if (!card) {
    return null;
  }

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDeleteCard(card.id);
      onClose();
    }
  };

  const handleSave = () => {
    onUpdateCard(card.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(card);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (status) => {
    setEditData(prev => ({
      ...prev,
      status
    }));
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);
    setEditData(prev => ({
      ...prev,
      date: formattedDate
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('.');
    return new Date(`20${year}-${month}-${day}`);
  };

  const getThemeClass = (category) => {
    const themes = {
      'Web Design': 'orange',
      'Research': 'green',
      'Copywriting': 'purple'
    };
    return themes[category] || 'green';
  };

  const themeClass = getThemeClass(card.category);

  return (
    <PopupContainer isOpen={!!card}>
      <PopupOverlay>
        <PopupBlock>
          <PopupContent>
            <PopupTopBlock>
              {isEditing ? (
                <EditInput
                  type="text"
                  name="title"
                  value={editData.title || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <PopupTitle>{card.title}</PopupTitle>
              )}
              <CategoryBadge theme={themeClass}>
                {card.category}
              </CategoryBadge>
            </PopupTopBlock>
            
            <StatusSection>
              <StatusTitle>Статус</StatusTitle>
              <StatusThemes>
                {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map(status => (
                  <StatusTheme 
                    key={status}
                    active={editData.status === status}
                    clickable={isEditing}
                    onClick={() => isEditing && handleStatusChange(status)}
                  >
                    <p>{status}</p>
                  </StatusTheme>
                ))}
                {!isEditing && (
                  <StatusTheme>
                    <p>{card.status}</p>
                  </StatusTheme>
                )}
              </StatusThemes>
            </StatusSection>

            <PopupWrap>
              <PopupForm id="formBrowseCard">
                <FormBlock>
                  <FormLabel htmlFor="textArea01">Описание задачи</FormLabel>
                  <FormTextarea 
                    name="description" 
                    id="textArea01" 
                    readOnly={!isEditing}
                    placeholder="Введите описание задачи..."
                    value={editData.description || ''}
                    onChange={handleInputChange}
                  />
                </FormBlock>
              </PopupForm>
              
              <Calendar 
                selectedDate={parseDate(editData.date)}
                onDateSelect={isEditing ? handleDateSelect : null}
              />
            </PopupWrap>

            <CategoriesSection>
              <StatusTitle>Категория</StatusTitle>
              <CategoryBadge theme={themeClass}>
                {card.category}
              </CategoryBadge>
            </CategoriesSection>

            {!isEditing ? (
              <ButtonsContainer>
                <ButtonGroup>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={() => setIsEditing(true)}
                  >
                    Редактировать задачу
                  </Button>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={handleDelete}
                  >
                    Удалить задачу
                  </Button>
                </ButtonGroup>
                <Button 
                  variant="primary"
                  size="small"
                  onClick={onClose}
                >
                  Закрыть
                </Button>
              </ButtonsContainer>
            ) : (
              <ButtonsContainer>
                <ButtonGroup>
                  <Button 
                    variant="primary"
                    size="small"
                    onClick={handleSave}
                  >
                    Сохранить
                  </Button>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={handleCancel}
                  >
                    Отменить
                  </Button>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={handleDelete}
                  >
                    Удалить задачу
                  </Button>
                </ButtonGroup>
                <Button 
                  variant="primary"
                  size="small"
                  onClick={onClose}
                >
                  Закрыть
                </Button>
              </ButtonsContainer>
            )}
          </PopupContent>
        </PopupBlock>
      </PopupOverlay>
    </PopupContainer>
  );
};

export default PopupBrowseCard;