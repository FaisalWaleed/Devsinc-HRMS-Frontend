import React from 'react';
import {
  Form,
  Field,
  reduxForm,
  FieldArray
} from 'redux-form'
import { Grid} from "material-ui";
import {
  CustomInput,
  ItemGrid,
  Danger,
  Button,
  CustomInputWrapper
} from "components";
import {
  Add,
  Remove
} from "material-ui-icons";
import {
  IconButton,
  Hidden,
} from "material-ui";
import validate from './validate';

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
  
  const { isNew,onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Grid container>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="address" required="required" autoComplete="address" type="text" custominputprops={{labelText: 'Address'}} component={CustomInputWrapper} />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="emergency_contact" required="required" autoComplete="emergency_contact" type="number" custominputprops={{labelText: 'Emergency Contact'}} component={CustomInputWrapper} />
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
    </Form>
  )
};


export default reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepTwo);
