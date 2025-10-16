import './SkeletonColumn.css';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

const SkeletonColumn = () => {
  return (
    <div className="skeleton-column">
      <div className="skeleton-column__title skeleton skeleton--text"></div>
      <div className="skeleton-column__cards">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default SkeletonColumn;