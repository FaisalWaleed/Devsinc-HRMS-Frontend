export const required = value => (value ? undefined : 'Required');
export const isEmail = value => value && !/^[A-Z0-9._%+-]+@devsinc.com$/i.test(value)
  ? 'Invalid email address, domain must be devsinc.com'
  : undefined;

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.firstName = 'Required'
  }
  if(values.contact_number === values.emergency_contact_person_number){
    errors.emergency_contact_person_number = "Can not be same as contact number!"
  }
  
  if(Object.keys(errors) > 0) {
    for (var key in errors) {
      errors._error += key + ': ' + errors[key]
    }
  }
  return errors
};

export default validate