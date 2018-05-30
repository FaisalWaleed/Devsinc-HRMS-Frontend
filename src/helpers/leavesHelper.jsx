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

export const getLeavesCountBetweenDates = (startDate,endDate) => {
  let leavesCount = 0;
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);
  while(currentDate <= endDate){
    leavesCount++;
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return leavesCount;
};

export const getTotalLeaves = (leaves) => {
  let leaveCount = 0;
  leaves.forEach((leave) => {
    leaveCount += getLeavesCountBetweenDates(leave.start_date,leave.end_date)
  });
  return leaveCount;
};


