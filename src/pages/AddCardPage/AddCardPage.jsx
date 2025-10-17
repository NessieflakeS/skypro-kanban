import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddCardContainer,
  AddCardForm,
  AddCardTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  SubmitButton,
  BackButton
} from './AddCardPage.styled';

const AddCardPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    status: 'Без статуса'
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Создана новая задача:', formData);
    
    navigate('/');
  };

  return (
    <AddCardContainer>
      <AddCardForm onSubmit={handleSubmit}>
        <AddCardTitle>Добавление новой задачи</AddCardTitle>
        
        <FormGroup>
          <FormLabel htmlFor="title">Название задачи</FormLabel>
          <FormInput
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Введите название задачи..."
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="description">Описание задачи</FormLabel>
          <FormTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Введите описание задачи..."
            rows="5"
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="category">Категория</FormLabel>
          <FormSelect
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Web Design">Web Design</option>
            <option value="Research">Research</option>
            <option value="Copywriting">Copywriting</option>
          </FormSelect>
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="status">Статус</FormLabel>
          <FormSelect
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="Без статуса">Без статуса</option>
            <option value="Нужно сделать">Нужно сделать</option>
            <option value="В работе">В работе</option>
            <option value="Тестирование">Тестирование</option>
            <option value="Готово">Готово</option>
          </FormSelect>
        </FormGroup>
        
        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <SubmitButton type="submit">
            Создать задачу
          </SubmitButton>
          <BackButton to="/">
            Отмена
          </BackButton>
        </div>
      </AddCardForm>
    </AddCardContainer>
  );
};

export default AddCardPage;