import React from 'react';
import {
  Field,
  reduxForm,
  FieldArray
} from 'redux-form'
import { Grid, InputAdornment } from "material-ui";
import {
  CustomInput,
  ItemGrid,
  Danger,
  Button,
  CustomInputWrapper
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
import { Add, Remove,KeyboardArrowLeft, KeyboardArrowRight  } from "material-ui-icons";
import {
  IconButton,
  Hidden,
  withStyles
} from "material-ui";
import headerLinksStyle from "variables/styles/headerLinksStyle";
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import {fetchRoles} from "../../api/role";
import {fetchRolesFailure, fetchRolesSuccess} from "../../actions/role";
import { DateRange } from 'material-ui-icons';
import { DatePicker } from 'material-ui-pickers'
import * as moment from 'moment';
import Stepper from 'material-ui/Stepper';
import Step from 'material-ui/Stepper/Step'
import StepLabel from 'material-ui/Stepper/StepLabel';
import StepContent from 'material-ui/Stepper/StepContent';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const required = value => (value ? undefined : 'Required');
const isEmail = value => value && !/^[A-Z0-9._%+-]+@devsinc.com$/i.test(value)
    ? 'Invalid email address, domain must be devsinc.com'
    : undefined;



function getSteps() {
  return ['Basic Information', 'Employee Record', 'Schedule Email'];
}


class UserForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      activeStep: 0,
    }
  }
  
  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };
  
  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };
  
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  
  componentDidMount() {
    const { fetchDepartments, fetchUsers, fetchRoles } = this.props;
    fetchDepartments();
    fetchUsers();
    fetchRoles();
  }
  
  render() {
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
    
    const steps = getSteps();
    const { activeStep } = this.state;
    const { error, handleSubmit, submitting, isNew, users, roles } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {index === 0 &&
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
                    }
                    
                    {index === 1 &&
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
                    }
                    
                    {index === 2 &&
                    <Grid container>
                      <ItemGrid xs={4} sm={4} md={4}>
                        <br />
                        <Field name="schedule_email" validate={[required]}  component={(input,label,custom) => (
                          <DatePicker
                            label="Send Email At: (Date Time Picker here)"
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
                    }
                    <div>
                      <div>
                        <br />
                        <br />
                        
                        {
                          index !== 0 && <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                          >
                            Back
                          </Button>
                        }
                        
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} >
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset} >
                Reset
              </Button>
            </Paper>
          )}
        </div>
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
}

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => { dispatch({type: types.HIDE_MODAL}) },
  fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess, fetchDepartmentsFailure)) },
  fetchUsers: () => { dispatch(fetchUsers(fetchUsersSuccess, fetchUsersFailure)) },
  fetchRoles: () => { dispatch(fetchRoles(fetchRolesSuccess,fetchRolesFailure)) }
});

function mapStateToProps({ departments, users, roles }) {
  return {
    departments: departments.departments,
    users: users.allUsers,
    roles: roles.roles
  };
}

UserForm = reduxForm({
  form: 'user_form'
})(UserForm);

UserForm = withStyles(headerLinksStyle)(UserForm);
export default UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
