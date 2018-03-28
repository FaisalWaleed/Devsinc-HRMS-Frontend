import React from 'react';
import { Field,reduxForm } from 'redux-form'

import { Grid } from "material-ui";
import {
    RegularCard,
    Button,
    CustomInput,
    ItemGrid
} from "components";
import { connect } from "react-redux";

class ProfileForm extends React.Component {

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={8}>
                      <RegularCard
                        cardTitle="Edit Profile"
                        cardSubtitle="Complete your profile"
                        content={
                          <div>
                            <Grid container>
                              <ItemGrid xs={12} sm={12} md={5}>
                                <Field name="company_id" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Company (disabled)"
                                      id="company-disabled"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        disabled: true,
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        name: "company_id"
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={3}>
                                <Field name="username" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Username"
                                      id="username"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "username",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={4}>
                                <Field name="email" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Email address"
                                      id="email"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "email",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                            </Grid>
                            <Grid container>
                              <ItemGrid xs={12} sm={12} md={4}>
                                <Field name="name" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Name"
                                      id="name"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "name",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={4}>
                                <Field name="contact_number" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Contact Number"
                                      id="contact_number"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "contact_number",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={4}>
                                <Field name="dob" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Date Of Birth"
                                      id="dob"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "dob",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                            </Grid>
                            <Grid container>
                              <ItemGrid xs={12} sm={12} md={6}>
                                <Field name="permanent_address" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Permanent Adress"
                                      id="permanent_address"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "permanent_address",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={6}>
                                <Field name="temporary_address" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Temporary Adress"
                                      id="temporary_address"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "temporary_address",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
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
                        cardSubtitle="Fill in cotact information"
                        content={
                            <Grid container>
                              <ItemGrid xs={12} sm={12} md={12}>
                                <Field name="emergency_contact_person_name" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Person Name"
                                      id="emergency_contact_person_name"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "emergency_contact_person_name",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={12}>
                                <Field name="emergency_contact_person_relation" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Relation"
                                      id="emergency_contact_person_relation"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "emergency_contact_person_relation",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={12}>
                                <Field name="emergency_contact_person_number" type="text" component={({input,label,...custom}) =>
                                    <CustomInput
                                      labelText="Number"
                                      id="emergency_contact_person_number"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "emergency_contact_person_number",
                                        autoComplete: "on",
                                      }}
                                    />
                                }
                                />
                              </ItemGrid>
                            </Grid>
                        }
                        />
                    </ItemGrid>
                  </Grid>
            </form>
        );
    }
};

function mapStateToProps({ users }) {
    console.log("this is the user", users.profile);
  return { 
    initialValues: users.profile
  };
}

ProfileForm =  reduxForm({
    form: 'profile'
})(ProfileForm);

ProfileForm = connect(mapStateToProps, null)(ProfileForm)

export default ProfileForm
