import React from 'react';
import {
  Form,
  Field,
  reduxForm,
  FieldArray
} from 'redux-form'
import { Grid, InputAdornment,  IconButton, Hidden, } from "material-ui";
import {
  CustomInput,
  ItemGrid,
  Danger,
  Button,
  CustomInputWrapper,
  Muted
} from "components";
import {
  Add,
  Remove,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  DateRange
} from "material-ui-icons";
import validate, {required} from './validate';
import { DatePicker } from 'material-ui-pickers'
import * as moment from 'moment';

const UserFormStepTwo = (props) => {
  const renderFields = ({fields, meta: {error, submitFailed}}) => (
    <div>
      Employment History
      <IconButton
        color="inherit"
        aria-label="Add"
      >
        <Add
          onClick={() => fields.push({})}
        />
        <Hidden mdUp>
          <p >Add Position</p>
        </Hidden>
      </IconButton>
      {fields.map((position, index) => (
        <Grid container key={index}>
          <ItemGrid xs={4} sm={4} md={4}>
            <Field name={`${position}.role`} type="text" component={({input,label,...custom}) =>
              <CustomInput
                labelText="Role"
                id="role"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  ...input,
                  ...custom,
                  type: "text",
                  required: "text",
                  name: `${position}.role`,
                  autoComplete: "role",
                }}
              />
            }
            />
          </ItemGrid>
          <ItemGrid xs={3} sm={3} md={3}>
            <Field name={`${position}.from`} type="number" component={({input,label,...custom}) =>
              <CustomInput
                labelText="From"
                id="from"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  ...input,
                  ...custom,
                  type: "text",
                  required: "text",
                  name: `${position}.from`,
                  autoComplete: "from",
                }}
              />
            }
            />
          </ItemGrid>
          <ItemGrid xs={3} sm={3} md={3}>
            <Field name={`${position}.to`} type="number" component={({input,label,...custom}) =>
              <CustomInput
                labelText="To"
                id="to"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  ...input,
                  ...custom,
                  type: "text",
                  required: "text",
                  name: `${position}.to`,
                  autoComplete: "to",
                }}
              />
            }
            />
          </ItemGrid>
          <ItemGrid xs={2} sm={2} md={2}>
            <IconButton
              color="inherit"
              aria-label="Remove"
            >
              <Remove
                onClick={() => fields.remove(index)}
              />
            </IconButton>
          </ItemGrid>
        </Grid>
      ))}
    </div>
  );
  
  const { isNew,handleSubmit, previousStep } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              <Field name="dob" validate={[required]}  component={(input,label,custom) => (
                <DatePicker
                  label="Date of Birth"
                  {...input}
                  {...custom}
                  format="Do MMMM YYYY"
                  value={input.input.value ? moment(input.input.value) : null }
                  onChange={(event) => input.input.onChange(event.format("YYYY-MM-DD"))}
                  disablePast={false}
                  leftArrowIcon={<KeyboardArrowLeft/>}
                  rightArrowIcon={<KeyboardArrowRight/>}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <DateRange />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )} />
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field validate={[required]} name="contact_number" required="required" autoComplete="contact_number" type="tel" custominputprops={{labelText: 'Contact Number'}} component={CustomInputWrapper} />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field validate={[required]} name="emergency_contact_person_number" required="required" autoComplete="emergency_contact_person_number" type="tel" custominputprops={{labelText: 'Emergency Contact Number'}} component={CustomInputWrapper} />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field validate={[required]} name="emergency_contact_person_relation" required="required" autoComplete="emergency_contact_person_relation" type="text" custominputprops={{labelText: 'Emergency Contact Person Relation'}} component={CustomInputWrapper} />
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              <Field validate={[required]} name="permanent_address" required="required" autoComplete="address" type="text" custominputprops={{labelText: 'Permanent Address'}} component={CustomInputWrapper} />
            </ItemGrid>
          </Grid>
          {
            isNew ?
              null:
              <div>
                <h3> Employment History </h3>
                <FieldArray name="employment_history" component={renderFields} />
              </div>
          }
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
        Next
      </Button>
    </Form>
  )
};


export default reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepTwo);
