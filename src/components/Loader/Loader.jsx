import './Loader.css'

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader-spinner"></div>
        <p>Загрузка...</p>
      </div>
    </div>
  )
}

export default Loader