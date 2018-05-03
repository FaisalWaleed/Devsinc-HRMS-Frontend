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

export const getCalendarSelectionFromLeaves = (allLeaves) => {
  let calendarSelection = {
    approved: [],
    pending: [],
    rejected: []
  };
  
  allLeaves.forEach(function (leave) {
    let dates = [];
    switch (leave.status){
      //Cases should be class names that need to be applied
      case "approved":
        dates = getWeekDayDates(leave.start_date,leave.end_date);
        dates.forEach(function (date) {
          calendarSelection.approved.push(date);
        });
        dates = [];
        break;
      case "pending":
        dates = getWeekDayDates(leave.start_date,leave.end_date);
        dates.forEach(function (date) {
          calendarSelection.pending.push(date);
        });
        dates = [];
        break;
      case "rejected":
        dates = getWeekDayDates(leave.start_date,leave.end_date);
        dates.forEach(function (date) {
          calendarSelection.rejected.push(date);
        });
        dates = [];
        break;
      default:
    }
  });
  
  return calendarSelection;
};