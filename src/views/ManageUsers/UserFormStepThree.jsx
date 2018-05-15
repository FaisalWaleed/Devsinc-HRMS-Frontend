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
  AccessTime
} from "material-ui-icons";
import { DateTimePicker } from 'material-ui-pickers'
import * as moment from 'moment';
import { required } from './validate';
import validate from './validate';


const UserFormStepThree = (props) => {
  const { onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
    <Grid container>
      <ItemGrid xs={4} sm={4} md={4}>
        <br />
        <Field name="schedule_date_time" validate={[required]} component={(input,label,custom) => (
          <DateTimePicker
            label="Schedule Welcome E-mail"
            {...input}
            {...custom}
            value={input.input.value ? moment(input.input.value) : null }
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
    </Form>
  )
};

export default reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepThree);