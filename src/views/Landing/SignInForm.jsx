import React from 'react';
import { Field,reduxForm } from 'redux-form'

import { Grid } from "material-ui";
import {
  RegularCard,
  Button,
  CustomInputWrapper,
  ItemGrid,
  Danger,
} from "components";


let SignInForm = props => {
  const { error,handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit} onKeyUp={(event) => {(event.key === "Enter" ? handleSubmit() : null )}}>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <RegularCard
            cardTitle="Sign In"
            content={
              <div>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Field name="email" type="text" custominputprops={{labelText: "Email Address"}} autoComplete="username" component={CustomInputWrapper} />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Field name="password" type="password" custominputprops={{labelText: "Password"}} autoComplete="current-password" component={CustomInputWrapper} />
                  </ItemGrid>
                </Grid>
              </div>
            }
            footer={
              <div>
                {error
                  ? <Danger>{error}</Danger>
                  : null
                }
                <Button disabled={submitting} onClick={handleSubmit} style={{float: "right"}} color="primary">Sign In</Button>
              </div>
            }
          />
        </ItemGrid>
      </Grid>
    </form>
  )
};

export default reduxForm({
  form: 'sign_in'
})(SignInForm);
