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
  CategoriesSection,
  ErrorMessage
} from './PopupBrowseCard.styled';

const PopupBrowseCard = ({ card, onDeleteCard, onUpdateCard, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
  if (card) {
    setEditData({
      title: card.title,
      category: card.topic, 
      status: card.status,
      description: card.description || '',
      date: card.date ? formatDate(new Date(card.date)) : ''
    });
  }
}, [card]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      setIsLoading(true);
      try {
        await onDeleteCard(card.id);
      } catch (err) {
        setError(err.message || 'Ошибка при удалении задачи');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
  setIsLoading(true);
  try {
    await onUpdateCard(card._id, {
      ...editData,
      category: editData.category 
    });
  } catch (err) {
    console.error('Error updating card:', err);
  } finally {
    setIsLoading(false);
  }
};

  const handleCancel = () => {
    setEditData(card);
    setIsEditing(false);
    setError('');
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
    try {
      const [day, month, year] = dateString.split('.');
      return new Date(`20${year}-${month}-${day}`);
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
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
    <PopupContainer $isOpen={!!card}>
      <PopupOverlay onClick={onClose}>
        <PopupBlock onClick={(e) => e.stopPropagation()}>
          <PopupContent>
            <PopupTopBlock>
              {isEditing ? (
                <EditInput
                  type="text"
                  name="title"
                  value={editData.title || ''}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              ) : (
                <PopupTitle>{card.title}</PopupTitle>
              )}
              <CategoryBadge $theme={themeClass}>
                {card.category}
              </CategoryBadge>
            </PopupTopBlock>
            
            <StatusSection>
              <StatusTitle>Статус</StatusTitle>
              <StatusThemes>
                {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map(status => (
                  <StatusTheme 
                    key={status}
                    $active={editData.status === status}
                    $clickable={isEditing}
                    onClick={() => isEditing && handleStatusChange(status)}
                  >
                    <p>{status}</p>
                  </StatusTheme>
                ))}
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
                    disabled={!isEditing || isLoading}
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
              <CategoryBadge $theme={themeClass}>
                {card.category}
              </CategoryBadge>
            </CategoriesSection>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {!isEditing ? (
              <ButtonsContainer>
                <ButtonGroup>
                  <Button 
                    $variant="outline"
                    $size="small"
                    onClick={() => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    Редактировать задачу
                  </Button>
                  <Button 
                    $variant="outline"
                    $size="small"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Удаление...' : 'Удалить задачу'}
                  </Button>
                </ButtonGroup>
                <Button 
                  $variant="primary"
                  $size="small"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Закрыть
                </Button>
              </ButtonsContainer>
            ) : (
              <ButtonsContainer>
                <ButtonGroup>
                  <Button 
                    $variant="primary"
                    $size="small"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Сохранение...' : 'Сохранить'}
                  </Button>
                  <Button 
                    $variant="outline"
                    $size="small"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Отменить
                  </Button>
                  <Button 
                    $variant="outline"
                    $size="small"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Удалить задачу
                  </Button>
                </ButtonGroup>
                <Button 
                  $variant="primary"
                  $size="small"
                  onClick={onClose}
                  disabled={isLoading}
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