import React from 'react';
import { Field,reduxForm, Form } from 'redux-form'
import { Grid, InputAdornment, IconButton } from "material-ui";
import {
  RegularCard,
  Button,
  CustomInputWrapper,
  ItemGrid,
  FileInput
} from "components";
import { connect } from "react-redux";
import {required} from "../ManageUsers/validate";
import { DatePicker } from 'material-ui-pickers';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  DateRange
} from "material-ui-icons";
import * as moment from 'moment';

class ProfileForm extends React.Component {
  
  render() {
    const { handleSubmit } = this.props;
    
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Edit Profile"
              cardSubtitle="Complete your profile"
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={3} sm={3} md={3}>
                      <Field name="first_name" type="text" custominputprops={{labelText: "First Name"}} component={CustomInputWrapper} />
                    </ItemGrid>
                    <ItemGrid xs={3} sm={3} md={3}>
                      <Field name="last_name" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Last Name"}} />
                    </ItemGrid>
                    <ItemGrid xs={5} sm={5} md={5}>
                      <Field name="email" type="text" disabled component={CustomInputWrapper} custominputprops={{labelText: "E-mail Address"}} />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={4} sm={4} md={4}>
                      <Field name="contact_number" type="tel" component={CustomInputWrapper} custominputprops={{labelText: "Contact Number"}} />
                    </ItemGrid>
                    <ItemGrid xs={4} sm={4} md={4}>
                      <Field name="secondary_contact_number" type="tel" component={CustomInputWrapper} custominputprops={{labelText: "Secondary Contact Number"}} />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <Field name="permanent_address" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Address"}} />
                    </ItemGrid>
                  </Grid>
                  <br/><br/>
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
                  <br /><br />
                  <Grid container>
                    <ItemGrid xs={4} sm={4} md={4}>
                      <img width="300" src={this.props.initialValues ? this.props.initialValues.image.url : null } />
                      <Field type="input" name="image" component={FileInput}/>
                    </ItemGrid>
                  </Grid>
                </div>
              }
              footer={<Button color="primary" type="submit">Update Profile</Button>}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <RegularCard
              cardTitle="Emergency Contact Information"
              cardSubtitle="Fill in contact information"
              content={
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Field name="emergency_contact_person_name" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Contact Name"}} />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Field name="emergency_contact_person_relation" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Relation with Contact"}} />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <Field name="emergency_contact_person_number" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Contact Number"}} />
                  </ItemGrid>
                </Grid>
              }
            />
          </ItemGrid>
        </Grid>
      </Form>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    initialValues: users.profile
  };
}

ProfileForm =  reduxForm({
  form: 'profile',
  destroyOnUnmount: false
})(ProfileForm);

ProfileForm = connect(mapStateToProps, null)(ProfileForm)

export default ProfileForm
