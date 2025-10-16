import './PopupNewCard.css'
import { useState } from 'react'
import Calendar from '../../Common/Calendar/Calendar'
import Button from '../../Common/Button/Button'

const PopupNewCard = ({ onCreateCard }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    date: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }))
  }

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date)
    setFormData(prev => ({
      ...prev,
      date: formattedDate
    }))
  }

  const formatDate = (date) => {
    if (!date) return ''
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    return `${day}.${month}.${year}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onCreateCard({
        ...formData,
        date: formData.date || formatDate(new Date()) 
      })
      window.location.hash = ''
      setFormData({
        title: '',
        description: '',
        category: 'Web Design',
        date: ''
      })
    }
  }

  const handleClose = () => {
    window.location.hash = ''
  }

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#/" className="pop-new-card__close" onClick={handleClose}>&#10006;</a>
            <div className="pop-new-card__wrap">
              <form className="pop-new-card__form form-new" id="formNewCard" onSubmit={handleSubmit}>
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <input 
                    className="form-new__input" 
                    type="text" 
                    name="title" 
                    id="formTitle" 
                    placeholder="Введите название задачи..." 
                    autoFocus 
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
                  <textarea 
                    className="form-new__area" 
                    name="description" 
                    id="textArea" 
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
              
              <Calendar 
                selectedDate={formData.date ? new Date(formData.date.split('.').reverse().join('-')) : null}
                onDateSelect={handleDateSelect}
              />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div 
                  className={`categories__theme _orange ${formData.category === 'Web Design' ? '_active-category' : ''}`}
                  onClick={() => handleCategorySelect('Web Design')}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div 
                  className={`categories__theme _green ${formData.category === 'Research' ? '_active-category' : ''}`}
                  onClick={() => handleCategorySelect('Research')}
                >
                  <p className="_green">Research</p>
                </div>
                <div 
                  className={`categories__theme _purple ${formData.category === 'Copywriting' ? '_active-category' : ''}`}
                  onClick={() => handleCategorySelect('Copywriting')}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            <Button 
              variant="primary"
              size="small"
              onClick={handleSubmit}
              disabled={!formData.title.trim()}
              style={{ float: 'right' }}
            >
              Создать задачу
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupNewCard