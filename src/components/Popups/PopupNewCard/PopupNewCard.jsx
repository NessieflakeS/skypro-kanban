import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../Common/Calendar/Calendar';
import Button from '../../Common/Button/Button';
import {
  PopupContainer,
  PopupOverlay,
  PopupBlock,
  PopupContent,
  PopupTitle,
  PopupClose,
  PopupWrap,
  PopupForm,
  FormBlock,
  FormLabel,
  FormInput,
  FormTextarea,
  Categories,
  CategoriesTitle,
  CategoriesThemes,
  CategoryTheme,
  SubmitButton,
  ErrorMessage // Убедитесь, что этот импорт присутствует
} from './PopupNewCard.styled';

const PopupNewCard = ({ onCreateCard, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    date: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);
    setFormData(prev => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.title?.trim()) {
      setError('Введите название задачи');
      return;
    }
    
    if (!formData.date?.trim()) {
      setError('Выберите дату выполнения');
      return;
    }
    
    if (!formData.category?.trim()) {
      setError('Выберите категорию');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await onCreateCard(formData);
    } catch (err) {
      setError(err.message || 'Ошибка при создании задачи');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <PopupContainer $isOpen={true}>
      <PopupOverlay onClick={handleClose}>
        <PopupBlock onClick={(e) => e.stopPropagation()}>
          <PopupContent>
            <PopupTitle>Создание задачи</PopupTitle>
            <PopupClose onClick={handleClose}>&#10006;</PopupClose>
            <PopupWrap>
              <PopupForm id="formNewCard" onSubmit={handleSubmit}>
                <FormBlock>
                  <FormLabel htmlFor="formTitle">Название задачи</FormLabel>
                  <FormInput 
                    type="text" 
                    name="title" 
                    id="formTitle" 
                    placeholder="Введите название задачи..." 
                    autoFocus 
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </FormBlock>
                <FormBlock>
                  <FormLabel htmlFor="textArea">Описание задачи</FormLabel>
                  <FormTextarea 
                    name="description" 
                    id="textArea" 
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </FormBlock>
              </PopupForm>
              
              <Calendar 
                selectedDate={formData.date ? parseDate(formData.date) : null}
                onDateSelect={handleDateSelect}
              />
            </PopupWrap>
            <Categories>
              <CategoriesTitle>Категория</CategoriesTitle>
              <CategoriesThemes>
                <CategoryTheme 
                  $theme="orange"
                  $active={formData.category === 'Web Design'}
                  onClick={() => handleCategorySelect('Web Design')}
                >
                  Web Design
                </CategoryTheme>
                <CategoryTheme 
                  $theme="green"
                  $active={formData.category === 'Research'}
                  onClick={() => handleCategorySelect('Research')}
                >
                  Research
                </CategoryTheme>
                <CategoryTheme 
                  $theme="purple"
                  $active={formData.category === 'Copywriting'}
                  onClick={() => handleCategorySelect('Copywriting')}
                >
                  Copywriting
                </CategoryTheme>
              </CategoriesThemes>
            </Categories>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton 
              onClick={handleSubmit}
              disabled={!formData.title.trim() || isLoading}
            >
              {isLoading ? 'Создание...' : 'Создать задачу'}
            </SubmitButton>
          </PopupContent>
        </PopupBlock>
      </PopupOverlay>
    </PopupContainer>
  );
};

export default PopupNewCard;