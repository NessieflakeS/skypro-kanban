import {
  SkeletonCardContainer,
  SkeletonCardHeader,
  SkeletonCardContent,
  SkeletonElement
} from './SkeletonCard.styled';

const SkeletonCard = () => {
  return (
    <SkeletonCardContainer>
      <SkeletonCardHeader>
        <SkeletonElement variant="theme" />
        <SkeletonElement variant="button" />
      </SkeletonCardHeader>
      <SkeletonCardContent>
        <SkeletonElement variant="title" />
        <SkeletonElement variant="date" />
      </SkeletonCardContent>
    </SkeletonCardContainer>
  );
};

export default SkeletonCard;