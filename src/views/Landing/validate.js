export const required = value => (value ? undefined : 'Required');

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required'
  }
  if(!values.password_confirmation){
    errors.password_confirmation = "Required"
  }
  if(values.password !== values.password_confirmation){
    errors.password_confirmation = "Passwords should match!"
  }
  if(Object.keys(errors) > 0) {
    for (var key in errors) {
      errors._error += key + ': ' + errors[key]
    }
  }
  return errors;
};

export default validate