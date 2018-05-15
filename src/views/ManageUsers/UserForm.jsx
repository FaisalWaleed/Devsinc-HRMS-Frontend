import React from 'react';
import {
  Form,
  Field,
  reduxForm,
  FieldArray, formValueSelector
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
  Remove,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  DateRange,
  AccessTime
} from "material-ui-icons";
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
import { DatePicker, DateTimePicker } from 'material-ui-pickers'
import * as moment from 'moment';
import Stepper from 'material-ui/Stepper';
import Step from 'material-ui/Stepper/Step'
import StepLabel from 'material-ui/Stepper/StepLabel';
import StepContent from 'material-ui/Stepper/StepContent';
import UserFormStepOne from './UserFormStepOne';
import UserFormStepTwo from './UserFormStepTwo';
import UserFormStepThree from './UserFormStepThree';

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
  
  componentDidMount() {
    const { fetchDepartments, fetchUsers, fetchRoles } = this.props;
    fetchDepartments();
    fetchUsers();
    fetchRoles();
  }
  
  
  render() {
    
    const steps = getSteps();
    const { activeStep } = this.state;
    const { error, handleSubmit, submitting, isNew, users, roles } = this.props;
    return (
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {index === 0 && <UserFormStepOne roles={roles} users={users} onSubmit={handleSubmit} />}
                  {index === 1 && <UserFormStepTwo onSubmit={handleSubmit}/>}
                  {index === 2 && <UserFormStepThree onSubmit={handleSubmit}/>}
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
                      
                      {
                        activeStep !== steps.length - 1 &&
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={() => {this.handleNext()}}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      }
                      {
                        activeStep === steps.length - 1 &&
                        <Button disabled={submitting} onClick={handleSubmit} color="primary">
                          {isNew ? "Create User" : "Save Changes"}
                        </Button>
                        
                      }
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        <br/>
        {error
          ? <Danger>{error}</Danger>
          : null
        }
      </div>
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
    roles: roles.roles,
  };
}

export default UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
