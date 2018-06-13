import React from 'react';
import * as types from "../../actions/actionTypes";
import { connect } from 'react-redux';
import { fetchDepartments } from "api/department";
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
import {fetchRoles} from "../../api/role";
import {fetchRolesFailure, fetchRolesSuccess} from "../../actions/role";
import Stepper from 'material-ui/Stepper';
import Step from 'material-ui/Stepper/Step'
import StepLabel from 'material-ui/Stepper/StepLabel';
import StepContent from 'material-ui/Stepper/StepContent';
import UserFormStepOne from './UserFormStepOne';
import UserFormStepTwo from './UserFormStepTwo';
import UserFormStepThree from './UserFormStepThree';
import { fetchTitles } from "../../api/title";
import {fetchTitlesFailure, fetchTitlesSuccess} from "../../actions/title";

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
    const { fetchDepartments, fetchUsers, fetchRoles, fetchTitles } = this.props;
    fetchDepartments();
    fetchUsers();
    fetchRoles();
    fetchTitles();
  }
  
  
  render() {
    
    const steps = getSteps();
    const { activeStep } = this.state;
    const { onSubmit, initialValues, users, titles, isNew } = this.props;
    return (
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {index === 0 && <UserFormStepOne initialValues={initialValues} users={users} titles={titles} onSubmit={this.handleNext} />}
                  {index === 1 && <UserFormStepTwo initialValues={initialValues} isNew={isNew} previousStep={this.handleBack} onSubmit={this.handleNext}/>}
                  {index === 2 && <UserFormStepThree initialValues={initialValues} isNew={isNew} previousStep={this.handleBack} onSubmit={onSubmit}/>}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        <br/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => { dispatch({type: types.HIDE_MODAL}) },
  fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess, fetchDepartmentsFailure)) },
  fetchUsers: () => { dispatch(fetchUsers(fetchUsersSuccess, fetchUsersFailure)) },
  fetchRoles: () => { dispatch(fetchRoles(fetchRolesSuccess,fetchRolesFailure)) },
  fetchTitles: () => { dispatch(fetchTitles(fetchTitlesSuccess,fetchTitlesFailure)) }
});


function mapStateToProps({ departments, users, roles, titles }) {
  return {
    departments: departments.departments,
    users: users.allUsers,
    roles: roles.roles,
    titles: titles.allTitles
  };
}

export default UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
