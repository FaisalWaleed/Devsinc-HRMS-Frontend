import * as moment from 'moment';

export const getWeekDayDates = (startDate,endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);
  while(currentDate <= endDate){
    (currentDate.getDay() < 6 && currentDate.getDay() > 0 ) ? dates.push(moment(currentDate).format("YYYY-MM-DD")) : null ;
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates;
};