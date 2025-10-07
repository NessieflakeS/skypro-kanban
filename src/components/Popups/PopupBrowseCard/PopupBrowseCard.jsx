import './PopupBrowseCard.css'
import { useState, useEffect } from 'react'

const PopupBrowseCard = ({ card, onDeleteCard, onUpdateCard, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    if (card) {
      setEditData(card)
    }
  }, [card])

  if (!card) return null

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDeleteCard(card.id)
      window.location.hash = ''
    }
  }

  const handleSave = () => {
    onUpdateCard(card.id, editData)
    setIsEditing(false)
    window.location.hash = ''
  }

  const handleCancel = () => {
    setEditData(card)
    setIsEditing(false)
  }

  const handleClose = () => {
    onClose()
    window.location.hash = ''
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStatusChange = (status) => {
    setEditData(prev => ({
      ...prev,
      status
    }))
  }

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
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
              {/* Здесь будет компонент Calendar */}
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
                  <button className="btn-browse__edit _btn-bor _hover03" onClick={() => setIsEditing(true)}>
                    <a href="#/">Редактировать задачу</a>
                  </button>
                  <button className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                    <a href="#/">Удалить задачу</a>
                  </button>
                </div>
                <button className="btn-browse__close _btn-bg _hover01" onClick={handleClose}>
                  <a href="#/">Закрыть</a>
                </button>
              </div>
            ) : (
              <div className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button className="btn-edit__edit _btn-bg _hover01" onClick={handleSave}>
                    <a href="#/">Сохранить</a>
                  </button>
                  <button className="btn-edit__edit _btn-bor _hover03" onClick={handleCancel}>
                    <a href="#/">Отменить</a>
                  </button>
                  <button className="btn-edit__delete _btn-bor _hover03" onClick={handleDelete}>
                    <a href="#/">Удалить задачу</a>
                  </button>
                </div>
                <button className="btn-edit__close _btn-bg _hover01" onClick={handleClose}>
                  <a href="#/">Закрыть</a>
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