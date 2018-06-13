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
  Button,
  CustomInputWrapper
} from "components";
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { required, isEmail } from './validate';
import validate from './validate';

const UserFormStepOne = (props) => {
  const { users, titles, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
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
              <Field validate={[required]} name="title_id" required="required" autoComplete="title" type="text" custominputprops={{labelText: 'Title'}} component={({input}, meta) => (
                <div>
                  <CustomInput
                    isSelect={true}
                    formControlProps={{
                      fullWidth: true
                    }}
                    labelText={"Title"}
                    inputProps={{
                      value: input.value,
                      onChange: (event) => {if(event.target.value) return input.onChange(event, event.target.value);},
                      required: "required",
                      name: "title_id",
                      autoComplete: "title",
                    }}
                  >
                    {
                      titles ?
                        titles.map((title, index) => (
                            <MenuItem
                              key={index}
                              value={title.id}
                            >
                              <ListItemText primary={title.name} />
                            </MenuItem>
                          )
                        )
                        : null
                    }
                  </CustomInput>
                  { (meta.touched && meta.error) ? <small style={{color: 'red'}}>{meta.error}</small> : null}
                </div>
              )
              } />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="reporting_to"
                     validate={[required]}
                     component={({input}, meta) => (
                       <div>
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
                             name: "reporting_to",
                             autoComplete: "reporting_to",
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
                         { (meta.touched && meta.error) ? <small style={{color: 'red'}}>{meta.error}</small> : null}
                       </div>
                     )
                     }
              />
            </ItemGrid>
            <ItemGrid xs={4} sm={4} md={4}>
              <Field name="buddy_id"
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
        </ItemGrid>
      </Grid>
      <br />
      <Button
        type="submit"
        variant="raised"
        color="primary"
      >
        Next
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'user_form',
  validate,
  destroyOnUnmount: false,
})(UserFormStepOne);

