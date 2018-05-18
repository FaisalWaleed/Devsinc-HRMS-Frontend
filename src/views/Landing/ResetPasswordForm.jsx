import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Button, CustomInputWrapper } from 'components';
import validate from './validate';

class ResetPasswordForm extends React.Component{
  
  render(){
    const { handleSubmit } = this.props;
    return(
      <Form onSubmit={handleSubmit}>
        <Field name="reset_password_token" type="hidden" component="input" />
        <Field name="password" type="password" custominputprops={{labelText: "Password"}} component={CustomInputWrapper}/>
        <Field name="password_confirmation" type="password" custominputprops={{labelText: "Confirm Password"}} component={CustomInputWrapper}/>
        <Button type="submit" color="primary">Proceed</Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'reset_password',
  validate
})(ResetPasswordForm);