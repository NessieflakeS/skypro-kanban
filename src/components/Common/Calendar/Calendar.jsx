import { useState, useEffect } from 'react';
import {
  CalendarContainer,
  CalendarBlock,
  CalendarTitle,
  CalendarParagraph,
  CalendarNav,
  CalendarMonth,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  NavActions,
  NavAction,
  CalendarPeriod
} from './Calendar.styled';

const Calendar = ({ selectedDate, onDateSelect, className = '' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(selectedDate ? new Date(selectedDate) : null);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  useEffect(() => {
    if (selectedDate) {
      setSelectedDay(new Date(selectedDate));
    }
  }, [selectedDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay(selected);
    if (onDateSelect) {
      onDateSelect(selected);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayIndex = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    for (let i = prevMonthDays - firstDayIndex + 1; i <= prevMonthDays; i++) {
      days.push(
        <CalendarCell key={`prev-${i}`} isOtherMonth>
          {i}
        </CalendarCell>
      );
    }

    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        today.getDate() === i && 
        today.getMonth() === currentDate.getMonth() && 
        today.getFullYear() === currentDate.getFullYear();
      
      const isSelected = 
        selectedDay && 
        selectedDay.getDate() === i && 
        selectedDay.getMonth() === currentDate.getMonth() && 
        selectedDay.getFullYear() === currentDate.getFullYear();

      days.push(
        <CalendarCell 
          key={i}
          isToday={isToday}
          isSelected={isSelected}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </CalendarCell>
      );
    }

    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <CalendarCell key={`next-${i}`} isOtherMonth>
          {i}
        </CalendarCell>
      );
    }

    return days;
  };

  return (
    <CalendarContainer className={className}>
      <CalendarBlock>
        <CalendarNav>
          <CalendarMonth>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CalendarMonth>
          <NavActions>
            <NavAction onClick={handlePrevMonth} data-action="prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavAction>
            <NavAction onClick={handleNextMonth} data-action="next">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </NavAction>
          </NavActions>
        </CalendarNav>
        
        <CalendarContent>
          <CalendarDaysNames>
            {daysOfWeek.map(day => (
              <CalendarDayName key={day}>
                {day}
              </CalendarDayName>
            ))}
          </CalendarDaysNames>
          <CalendarCells>
            {renderCalendarDays()}
          </CalendarCells>
        </CalendarContent>
        
        <CalendarPeriod>
          <CalendarParagraph>
            {selectedDay ? (
              <>Срок исполнения: <span>{formatDate(selectedDay)}</span></>
            ) : (
              <>Выберите срок исполнения <span></span>.</>
            )}
          </CalendarParagraph>
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarContainer>
  );
};

export default Calendar;