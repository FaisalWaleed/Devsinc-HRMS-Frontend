import React from 'react';
import { Grid } from "material-ui";
import { RegularCard, Button, Table, ItemGrid } from "components";
import { connect } from 'react-redux';

import { fetchUsers, deleteUser, editUser } from "../../api/user";
import {fetchUsersSuccess, fetchUsersFailure, editUserSuccess, editUserFailure, deleteUserSuccess,deleteUserFailure } from "../../actions/user";

import { Delete,Edit } from "material-ui-icons";
import * as types from '../../actions/actionTypes';
import UserForm from './UserForm';
import { registerUser } from "../../actions/auth/authConfig";
import {SubmissionError} from "redux-form";
import {HIDE_MODAL} from "../../actions/modal";
import { drop,map,values } from 'lodash';

class ManageUsers extends React.Component{
  constructor(props){
    super(props);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleEditUserSubmit = this.handleEditUserSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  userWithButtons = (user) => {
    const { id, name, username, email, image, company, employment_history, reporting_to } = user;
    const requiredFields = [ name, username, email, company ];
    return [
      ...requiredFields,
      <Delete style={{'marginRight': '10px'}}
              onClick={
                this.props.openModal.bind(this,
                  types.DELETE_MODAL,
                  {
                    deleteAction: deleteUser(
                      id,
                      deleteUserSuccess,
                      deleteUserFailure
                    ),
                    resourceType: 'user'
                  }
                )
              }
      />,
      <Edit
        onClick={
          this.props.openModal.bind(this, types.FORM_MODAL,
            {
              form:
                <UserForm
                  initialValues={{
                    id,
                    name,
                    username,
                    email,
                    image,
                    company,
                    employment_history,
                    reporting_to
                  }}
                  onSubmit={this.handleEditUserSubmit}
                  isNew={false}
                />,
              title: `Edit ${email}`,
            }
          )
        }
      />
    ];
  };
  
  handleCreateUserSubmit(values){
    const { registerUser } = this.props;
    console.log(values);
    const {
      email,
      first_name,
      last_name,
      role_id,
      reporting_to,
      buddy_id,
      join_date,
      permanent_address,
      emergency_contact_person_number,
      employment_history,
      email_schedule,
      username,
      company_id,
      department_id,
    } = values;
    let password = "pass1234";
    return registerUser({
      email,
      first_name,
      last_name,
      role_id,
      reporting_to,
      buddy_id,
      join_date,
      permanent_address,
      emergency_contact_person_number,
      password,
      username,
      company_id,
      department_id,
      employment_history,
      email_schedule
    })
      .then( (response) => {
        this.props.fetchUsers(fetchUsersSuccess,fetchUsersFailure);
        this.props.closeModal();
      })
      .catch( (error) =>{
        if(!error.response){
          throw new SubmissionError({
            _error: "Something went wrong. Please try again later."
          });
        }
        else{
          error.response.data.errors.full_messages.forEach((error) => {
            throw new SubmissionError({
              _error: error
            })
          });
        }
      })
  }
  
  handleEditUserSubmit(values){
    this.props.editUser(values);
  };
  
  render(){
    const users = map(this.props.users, this.userWithButtons);
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Manage Users"
            cardSubtitle="Click on operations to perform actions"
            content={
              <div>
                <Button onClick={this.props.openModal.bind(this,types.FORM_MODAL,{title: 'Create New User', form: <UserForm onSubmit={this.handleCreateUserSubmit} isNew={true} />  })} color="primary">Create a New User</Button>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name","Username","Email","Company","Delete","Edit"]}
                  tableData={users}
                />
              </div>
            }
          />
        </ItemGrid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    closeModal: () => { dispatch(HIDE_MODAL) },
    registerUser: (...params) => dispatch(registerUser(...params)),
    fetchUsers: () => { dispatch(fetchUsers(fetchUsersSuccess,fetchUsersFailure)) },
    editUser: (params) => { dispatch(editUser(params,editUserSuccess,editUserFailure))}
    
  }
}

function mapStateToProps(state){
  return {
    users: state.users.allUsers
  }
}

export default ManageUsers = connect(mapStateToProps,mapDispatchToProps)(ManageUsers);
