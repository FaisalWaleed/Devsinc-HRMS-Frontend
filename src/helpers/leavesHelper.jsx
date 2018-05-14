import * as moment from 'moment';

export const getWeekDayDates = (startDate,endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);
  while(currentDate <= endDate){
    dates.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates;
};

export const getCalendarSelectionFromLeaves = (allLeaves) => {
  if(allLeaves.length) {
    let calendarSelection = {
      approved_by_reporting_to: [],
      approved_by_hr: [],
      pending: [],
      pending_on_hr: [],
      rejected_by_reporting_to: [],
      rejected_by_hr: []
    };
  
    allLeaves.forEach(function (leave) {
      let dates = [];
      switch (leave.status) {
        //Cases should be class names that need to be applied
        case "approved by Reporting to":
          dates = getWeekDayDates(leave.start_date, leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.approved_by_reporting_to.push(date);
          });
          dates = [];
          break;
        case "approved by HR":
          dates = getWeekDayDates(leave.start_date, leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.approved_by_hr.push(date);
          });
          dates = [];
          break;
        case "pending":
          dates = getWeekDayDates(leave.start_date, leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.pending.push(date);
          });
          dates = [];
          break;
        case "pending on HR":
          dates = getWeekDayDates(leave.start_date, leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.pending_on_hr.push(date);
          });
          dates = [];
          break;
        case "rejected by Reporting to":
          dates = getWeekDayDates(leave.start_date, leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.rejected_by_reporting_to.push(date);
          });
          dates = [];
          break;
        case "rejected by HR":
          dates = getWeekDayDates(leave.start_date, leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.rejected_by_hr.push(date);
          });
          dates = [];
          break;
        default:
      }
    });
  
    return calendarSelection;
  }
  return [];
};