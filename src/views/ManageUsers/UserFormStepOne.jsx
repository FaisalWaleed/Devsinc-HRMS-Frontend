import React from 'react';
import {
  Form,
  Field,
  reduxForm,
} from 'redux-form'
import { Grid, InputAdornment } from "material-ui";
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
  DateRange
} from "material-ui-icons";
import {
  IconButton,
} from "material-ui";
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { DatePicker } from 'material-ui-pickers'
import * as moment from 'moment';
import { required, isEmail } from './validate';
import validate from './validate';

const UserFormStepOne = (props) => {
  const { roles, users,onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Grid container>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field validate={[required, isEmail]} name="email" required="required" autoComplete="email" type="email" custominputprops={{labelText: 'Company E-mail'}} component={CustomInputWrapper} />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field validate={[required]} name="first_name" required="required" autoComplete="first_name" type="text" custominputprops={{labelText: 'First Name'}} component={CustomInputWrapper} />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field validate={[required]} name="last_name" required="required" autoComplete="last_name" type="text" custominputprops={{labelText: 'Last Name'}} component={CustomInputWrapper} />
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="role_id"
                     validate={[required]}
                     component={({input}) => (
                       <CustomInput
                         isSelect={true}
                         formControlProps={{
                           fullWidth: true
                         }}
                         labelText={"Role *"}
                         inputProps={{
                           value: input.value,
                           onChange: (event) => {if(event.target.value) return input.onChange(event, event.target.value);},
                           required: "required",
                           name: "role_id",
                           autoComplete: "role_id",
                         }}
                       >
                         {
                           roles ?
                             roles.map((role, index) => (
                                 <MenuItem
                                   key={index}
                                   value={role.id}
                                 >
                                   <ListItemText primary={role.title}/>
                                 </MenuItem>
                               )
                             )
                             : null
                         }
                       </CustomInput>
                     )
                     }
              />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="manager_id"
                     validate={[required]}
                     component={({input}) => (
                       <CustomInput
                         isSelect={true}
                         formControlProps={{
                           fullWidth: true
                         }}
                         labelText={"Manager *"}
                         inputProps={{
                           value: input.value,
                           onChange: (event) => {if(event.target.value) return input.onChange(event, event.target.value);},
                           required: "required",
                           name: "manager_id",
                           autoComplete: "manager_id",
                         }}
                       >
                         {
                           users ?
                             users.map((user, index) => (
                                 <MenuItem
                                   key={index}
                                   value={user.id}
                                 >
                                   <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                                 </MenuItem>
                               )
                             )
                             : null
                         }
                       </CustomInput>
                     )
                     }
              />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="buddy_id"
                     validate={[required]}
                     component={({input}) => (
                       <CustomInput
                         isSelect={true}
                         formControlProps={{
                           fullWidth: true
                         }}
                         labelText={"Buddy *"}
                         inputProps={{
                           value: input.value,
                           onChange: (event) => {if(event.target.value) return input.onChange(event, event.target.value);},
                           required: "required",
                           name: "buddy_id",
                           autoComplete: "buddy_id",
                         }}
                       >
                         {
                           users ?
                             users.map((user, index) => (
                                 <MenuItem
                                   key={index}
                                   value={user.id}
                                 >
                                   <ListItemText primary={user.name}/>
                                 </MenuItem>
                               )
                             )
                             : null
                         }
                       </CustomInput>
                     )
                     }
              />
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid xs={4} sm={4} md={4}>
              <br />
              <Field name="joining_date" validate={[required]}  component={(input,label,custom) => (
                <DatePicker
                  label="Joining Date"
                  {...input}
                  {...custom}
                  format="Do MMMM YYYY"
                  value={input.input.value ? moment(input.input.value) : null }
                  onChange={(event) => input.input.onChange(event.format("YYYY-MM-DD"))}
                  disablePast={true}
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
        </ItemGrid>
      </Grid>
    </Form>
  );
};

export default reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepOne);

