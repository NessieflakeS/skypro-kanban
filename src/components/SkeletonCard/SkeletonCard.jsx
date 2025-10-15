import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__header">
        <div className="skeleton skeleton--theme"></div>
        <div className="skeleton skeleton--button"></div>
      </div>
      <div className="skeleton-card__content">
        <div className="skeleton skeleton--title"></div>
        <div className="skeleton skeleton--date"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;