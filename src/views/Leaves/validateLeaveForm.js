import moment from 'moment';

export const required = value => (value ? undefined : 'Required');

export const validateLeaveForm = values => {
  const errors = {};
  if (!values.reason) {
    errors.reason = 'Please specify a valid reason'
  }
  
  if (!values.leave_type) {
    errors.leave_type = 'Please specify a Leave Type'
  }
  
  if (!values.start_date) {
    errors.start_date = 'Start and End Dates are required'
  }
  
  if (!values.end_date) {
    errors.start_date = 'Start and End Dates are required'
  }
  
  if(values.leave_type === "sick" && ((values.end_date - values.start_date) < 2)){
    errors.start_date = 'Sick leave can not be less than 2 days!'
  }
  
  if(Object.keys(errors) > 0) {
    for (var key in errors) {
      errors._error += key + ': ' + errors[key]
    }
  }
  return errors
};