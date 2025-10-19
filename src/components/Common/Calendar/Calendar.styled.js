import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 20px;

  @media screen and (max-width: 660px) {
    max-width: 340px;
    width: 100%;
  }
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarTitle = styled.div`
  margin-bottom: 14px;
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

export const CalendarParagraph = styled.p`
  color: ${props => props.theme.textTertiary};
  font-size: 10px;
  line-height: 1;

  span {
    color: ${props => props.theme.textPrimary};
  }

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

export const CalendarMonth = styled.div`
  color: ${props => props.theme.textTertiary};
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

export const CalendarDayName = styled.div`
  color: ${props => props.theme.textTertiary};
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }
`;

export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 660px) {
    width: 344px;
    height: auto;
    justify-content: space-around;
  }
`;

export const CalendarCell = styled.div.attrs(props => ({
  isothermonth: props.isOtherMonth ? 'true' : undefined,
  istoday: props.isToday ? 'true' : undefined,
  isselected: props.isSelected ? 'true' : undefined,
}))`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: ${props => {
    if (props.isOtherMonth) return 'transparent';
    if (props.isSelected) return '#FFFFFF';
    if (props.isToday) return props.theme.textPrimary;
    return props.theme.textTertiary;
  }};
  background-color: ${props => {
    if (props.isSelected) return props.theme.textSecondary;
    if (props.isToday) return 'transparent';
    return 'transparent';
  }};
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: ${props => props.isOtherMonth ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  font-weight: ${props => props.isToday ? '700' : 'normal'};

  &:hover {
    background-color: ${props => {
      if (!props.isOtherMonth && !props.isSelected) return props.theme.bgTertiary;
      return 'transparent';
    }};
    color: ${props => {
      if (!props.isOtherMonth && !props.isSelected) return props.theme.textTertiary;
      return 'inherit';
    }};
  }

  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    fill: ${props => props.theme.textTertiary};
  }
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;