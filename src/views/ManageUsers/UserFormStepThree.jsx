import React from 'react';
import {
  Form,
  Field,
  reduxForm,
} from 'redux-form'
import { Grid } from "material-ui";
import {
  CustomInput,
  ItemGrid,
  Danger,
  Button,
  CustomInputWrapper
} from "components";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  DateRange,
  AccessTime,
} from "material-ui-icons";
import { DateTimePicker } from 'material-ui-pickers'
import * as moment from 'moment';
import { required } from './validate';
import validate from './validate';



class UserFormStepThree extends React.Component {
  
  render() {
    const { handleSubmit, previousStep, error } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={4} sm={4} md={4}>
            <br/>
            <Field name="email_schedule" validate={[required]} component={(input, label, custom) => (
              <DateTimePicker
                label="Schedule Welcome E-mail"
                {...input}
                {...custom}
                value={input.input.value ? moment(input.input.value) : null}
                disablePast={true}
                onChange={(event) => input.input.onChange(event.format("YYYY-MM-DD"))}
                timeIcon={<AccessTime/>}
                dateRangeIcon={<DateRange/>}
                leftArrowIcon={<KeyboardArrowLeft/>}
                rightArrowIcon={<KeyboardArrowRight/>}
              />
            )}
            />
          </ItemGrid>
        </Grid>
        <br/>
        <Button
          variant="raised"
          color="primary"
          onClick={previousStep}
        >
          Back
        </Button>
        
        <Button
          type="submit"
          variant="raised"
          color="primary"
        >
          Create User
        </Button>
        
        {error
          ? <Danger>{error}</Danger>
          : null
        }
      </Form>
    )
  };
}

export default reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepThree);