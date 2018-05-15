export const required = value => (value ? undefined : 'Required');
export const isEmail = value => value && !/^[A-Z0-9._%+-]+@devsinc.com$/i.test(value)
  ? 'Invalid email address, domain must be devsinc.com'
  : undefined;

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.firstName = 'Required'
  }
  return errors
};

export default validate