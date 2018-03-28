import React from 'react';
import { 
    Field,
    reduxForm,
    FieldArray
    } from 'redux-form'

import { Grid } from "material-ui";
import {
    CustomInput,
    ItemGrid,
    Danger,
    Button,
} from "components";
import * as types from "../../actions/actionTypes";
import { connect } from 'react-redux';
import CustomSelect from 'components/CustomSelect';
import { 
  fetchDepartments 
} from "api/department";
import { 
  fetchDepartmentsSuccess, 
  fetchDepartmentsFailure
} from "actions/department";
import { 
  fetchUsers 
} from "api/user";
import { 
  fetchUsersSuccess, 
  fetchUsersFailure, 
} from "actions/user";
import {
    Add,
    Remove
} from "material-ui-icons";
import {
  IconButton,
  Hidden,
  withStyles
} from "material-ui";
import headerLinksStyle from "variables/styles/headerLinksStyle";


class UserForm extends React.Component {
    componentDidMount() {
      const { fetchDepartments, fetchUsers } = this.props;
        console.log("about to make the call");
        fetchDepartments();
        fetchUsers();
        console.log("made the call");
    }


    render() {
        const renderFields = ({fields, meta: {error, submitFailed}}) => (
          <div>
            <IconButton
              color="inherit"
              aria-label="Add"
              className={classes.buttonLink}
            >
              <Add 
              className={classes.links} 
              onClick={() => fields.push({})}
              />
              <Hidden mdUp>
                <p className={classes.linkText}>Add Position</p>
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
        )


        const { error, handleSubmit, submitting, isNew, departments, classes, users, departmentRoles } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <Grid container>
                            <ItemGrid xs={4} sm={4} md={4}>
                                <Field name="email" type="email" component={({input,label,...custom}) =>
                                    <CustomInput
                                        labelText="Email Address"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            ...input,
                                            ...custom,
                                            type: "email",
                                            required: "required",
                                            name: "email",
                                            autoComplete: "email",
                                        }}
                                    />
                                }
                                />
                            </ItemGrid>
                            <ItemGrid xs={4} sm={4} md={4}>
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
                                            autoComplete: "username",
                                        }}
                                    />
                                }
                                />
                            </ItemGrid>
                            <ItemGrid xs={4} sm={4} md={4}>
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
                                            autoComplete: "name",
                                        }}
                                    />
                                }
                                />
                            </ItemGrid>
                        </Grid>
                        <Grid container>
                            <ItemGrid xs={4} sm={4} md={4}>
                                <Field name="company_id" type="number" component={({input,label,...custom}) =>
                                    <CustomInput
                                        labelText="Company"
                                        id="company_id"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            ...input,
                                            ...custom,
                                            type: "text",
                                            required: "text",
                                            name: "company_id",
                                            autoComplete: "company_id",
                                        }}
                                    />
                                }
                                />
                            </ItemGrid>
                            <ItemGrid xs={4} sm={4} md={4}>
                                <Field 
                                    name="reporting_to" 
                                    type="number" 
                                    component={CustomSelect} 
                                    componentName="Reporting To" 
                                    data={users}
                                />
                            </ItemGrid>
                        </Grid>
                        {
                          isNew? 
                          null:
                          <div>
                            <h3> Employment History </h3> 
                            <FieldArray name="employment_history" component={renderFields} />
                          </div>
                        }
                  </ItemGrid>
                </Grid>
                <br/>
                {error
                    ? <Danger>{error}</Danger>
                    : null
                }
                <div>
                    <Button onClick={this.props.handleClose} disabled={submitting} color="primary">Cancel</Button>
                    <Button disabled={submitting} onClick={handleSubmit} color="primary">{isNew ? "Create User" : "Save Changes"}</Button>
                </div>
            </form>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleClose: () => { dispatch({type: types.HIDE_MODAL}) },
    fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess, fetchDepartmentsFailure)) },
    fetchUsers: () => { dispatch(fetchUsers(fetchUsersSuccess, fetchUsersFailure)) }
})

function mapStateToProps({ departments, users }) {
  return { 
    departments: departments.departments,
    users: users.allUsers
  };
}

UserForm = reduxForm({
    form: 'user_form'
})(UserForm);

UserForm = withStyles(headerLinksStyle)(UserForm);
export default UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
