import SkeletonCard from '../SkeletonCard/SkeletonCard';
import {
  SkeletonColumnContainer,
  SkeletonColumnTitle,
  SkeletonColumnCards
} from './SkeletonColumn.styled';

const SkeletonColumn = () => {
  return (
    <SkeletonColumnContainer>
      <SkeletonColumnTitle variant="text" />
      <SkeletonColumnCards>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </SkeletonColumnCards>
    </SkeletonColumnContainer>
  );
};

export default SkeletonColumn;