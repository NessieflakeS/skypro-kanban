import styled from 'styled-components';
import { SkeletonElement } from '../SkeletonCard/SkeletonCard.styled';

export const SkeletonColumnContainer = styled.div`
  min-width: 220px;
  flex: 1;
  max-width: 300px;
`;

export const SkeletonColumnTitle = styled(SkeletonElement)`
  width: 120px;
  height: 16px;
  margin: 20px 10px;
`;

export const SkeletonColumnCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;