import './PopupBrowseCard.css'
import { useState, useEffect } from 'react'
import Calendar from '../../Common/Calendar/Calendar'

const PopupBrowseCard = ({ card, onDeleteCard, onUpdateCard, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  // Обновляем editData при изменении card
  useEffect(() => {
    if (card) {
      setEditData(card)
    }
  }, [card])

  if (!card) {
    console.log('No card provided to PopupBrowseCard');
    return null;
  }

  const handleDelete = () => {
    console.log('Delete button clicked for card:', card.id);
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDeleteCard(card.id);
      onClose();
    }
  }

  const handleSave = () => {
    console.log('Save button clicked with data:', editData);
    onUpdateCard(card.id, editData);
    setIsEditing(false);
  }

  const handleCancel = () => {
    console.log('Cancel button clicked');
    setEditData(card);
    setIsEditing(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStatusChange = (status) => {
    console.log('Status changed to:', status);
    setEditData(prev => ({
      ...prev,
      status
    }))
  }

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date)
    setEditData(prev => ({
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

  const parseDate = (dateString) => {
    if (!dateString) return null
    const [day, month, year] = dateString.split('.')
    return new Date(`20${year}-${month}-${day}`)
  }

  return (
    <div className="pop-browse" id="popBrowse" style={{ display: 'block' }}>
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={editData.title || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  card.title
                )}
              </h3>
              <div className={`categories__theme theme-top _${getThemeClass(card.category)} _active-category`}>
                <p className={getThemeClass(card.category)}>{card.category}</p>
              </div>
            </div>
            
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'].map(status => (
                  <div 
                    key={status}
                    className={`status__theme ${isEditing ? '' : '_hide'} ${editData.status === status ? '_active-status' : ''}`}
                    onClick={() => isEditing && handleStatusChange(status)}
                  >
                    <p>{status}</p>
                  </div>
                ))}
                {!isEditing && (
                  <div className="status__theme _gray">
                    <p className="_gray">{card.status}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea 
                    className="form-browse__area" 
                    name="description" 
                    id="textArea01" 
                    readOnly={!isEditing}
                    placeholder="Введите описание задачи..."
                    value={editData.description || ''}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
              
              <div className="pop-new-card__calendar calendar">
                <p className="calendar__ttl subttl">Даты</p>
                <Calendar 
                  selectedDate={parseDate(editData.date)}
                  onDateSelect={isEditing ? handleDateSelect : null}
                />
              </div>
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className={`categories__theme _${getThemeClass(card.category)} _active-category`}>
                <p className={getThemeClass(card.category)}>{card.category}</p>
              </div>
            </div>

            {!isEditing ? (
              <div className="pop-browse__btn-browse">
                <div className="btn-group">
                  <button 
                    className="btn-browse__edit _btn-bor _hover03" 
                    onClick={() => setIsEditing(true)}
                  >
                    Редактировать задачу
                  </button>
                  <button 
                    className="btn-browse__delete _btn-bor _hover03" 
                    onClick={handleDelete}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button 
                  className="btn-browse__close _btn-bg _hover01" 
                  onClick={onClose}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button 
                    className="btn-edit__edit _btn-bg _hover01" 
                    onClick={handleSave}
                  >
                    Сохранить
                  </button>
                  <button 
                    className="btn-edit__edit _btn-bor _hover03" 
                    onClick={handleCancel}
                  >
                    Отменить
                  </button>
                  <button 
                    className="btn-edit__delete _btn-bor _hover03" 
                    onClick={handleDelete}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button 
                  className="btn-edit__close _btn-bg _hover01" 
                  onClick={onClose}
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function getThemeClass(category) {
  const themes = {
    'Web Design': 'orange',
    'Research': 'green',
    'Copywriting': 'purple'
  }
  return themes[category] || 'green'
}

export default PopupBrowseCard