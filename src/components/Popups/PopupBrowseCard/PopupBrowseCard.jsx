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

const PopupBrowseCard = ({ card, onDeleteCard, onUpdateCard, onClose, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (card && card._id) {
      setEditData({
        title: card.title,
        category: card.topic,
        status: card.status,
        description: card.description || '',
        date: card.date ? formatDate(new Date(card.date)) : ''
      });
    }
  }, [card]);

  if (!card || !card._id) {
    console.error('Card or card ID is undefined:', card);
    onClose();
    return null;
  }

  const formatDate = (date) => {
    if (!date) return '';
    try {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    try {
      const [day, month, year] = dateString.split('.');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      setIsLoading(true);
      try {
        if (card && card._id) {
          await onDeleteCard(card._id);
        } else {
          console.error('Cannot delete: card ID is undefined');
        }
      } catch (err) {
        console.error('Error deleting card:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!editData.title?.trim()) {
      setError('Введите название задачи');
      return;
    }
    
    if (!editData.date?.trim()) {
      setError('Выберите дату выполнения');
      return;
    }
    
    if (!editData.category?.trim()) {
      setError('Выберите категорию');
      return;
    }

    setIsLoading(true);
    try {
      if (card && card._id) {
        await onUpdateCard(card._id, editData);
      } else {
        console.error('Cannot update: card ID is undefined');
      }
    } catch (err) {
      setError('Ошибка при обновлении задачи: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (card) {
      setEditData({
        title: card.title,
        category: card.topic,
        status: card.status,
        description: card.description || '',
        date: card.date ? formatDate(new Date(card.date)) : ''
      });
    }
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

  const getThemeClass = (category) => {
    const themes = {
      'Web Design': 'orange',
      'Research': 'green',
      'Copywriting': 'purple'
    };
    return themes[category] || 'green';
  };

  const themeClass = getThemeClass(card.topic);

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
                {card.topic}
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
                    disabled={isLoading}
                  />
                </FormBlock>
              </PopupForm>
              
              <Calendar 
                selectedDate={editData.date ? parseDate(editData.date) : null}
                onDateSelect={isEditing ? handleDateSelect : null}
              />
            </PopupWrap>

            <CategoriesSection>
              <StatusTitle>Категория</StatusTitle>
              <CategoryBadge $theme={themeClass}>
                {card.topic}
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