import React from 'react';
import { Grid } from "material-ui";
import { RegularCard, Button, Table, ItemGrid, Permissible } from "components";
import { connect } from 'react-redux';
import {fetchUsers, deleteUser, editUser, createUser, activateUser} from "../../api/user";
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  editUserSuccess,
  editUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  createUserSuccess, createUserFailure, clearUserCreateForm, activateUserSuccess, activateUserFailure
} from "../../actions/user";
import { Lock, LockOpen,Edit } from "material-ui-icons";
import * as types from '../../actions/actionTypes';
import UserForm from './UserForm';
import {HIDE_MODAL} from "../../actions/modal";
import { map } from 'lodash';
import { hasPermission } from "../../helpers/permissionsHelper";
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';

class Users extends React.Component{
  constructor(props){
    super(props);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleEditUserSubmit = this.handleEditUserSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  userWithButtons = (user) => {
    const { id, name, email,dob, emergency_contact_person_number, emergency_contact_person_relation, permanent_address, join_date, buddy_id, first_name, last_name, image, title, contact_number, employment_history, reporting_to, manager, deleted_at } = user;
    const requiredFields = [ <Avatar src={image} />, name, title,email,contact_number, manager ];
    return [
      ...requiredFields,
      deleted_at
        ?
        <Permissible
          requiredPermissions={["users_restore_user"]}
        >
          <Tooltip title={`Unblock ${name}`}>
            <Lock
              onClick={
                this.props.openModal.bind(this,
                  types.DELETE_MODAL,
                  {
                    deleteAction: activateUser(id,activateUserSuccess,activateUserFailure),
                    resourceType: 'user',
                    title: 'Are you sure you want to Activate this user?',
                    message: ' '
                  }
                )
              }
            
            
            />
          </Tooltip>
        </Permissible>
        :
        <Permissible
          requiredPermissions={["users_destroy"]}
        >
          <Tooltip title={`Block ${name}`}>
          <LockOpen style={{'marginRight': '10px'}}
                    onClick={
                      this.props.openModal.bind(this,
                        types.DELETE_MODAL,
                        {
                          deleteAction: deleteUser(
                            id,
                            deleteUserSuccess,
                            deleteUserFailure
                          ),
                          resourceType: 'user',
                          title: 'Are you sure you want to Deactivate this user?',
                          message: ' '
                        }
                      )
                    }
          />
          </Tooltip>
        </Permissible>,
      <Permissible
        requiredPermissions={["users_update_all"]}
      >
        <Edit
          onClick={
            this.props.openModal.bind(this, types.FORM_MODAL,
              {
                form:
                  <UserForm
                    initialValues={{
                      id,
                      email,
                      first_name,
                      last_name,
                      title,
                      reporting_to,
                      buddy_id,
                      dob,
                      contact_number,
                      emergency_contact_person_number,
                      emergency_contact_person_relation,
                      permanent_address,
                      join_date,
                      employment_history,
                    }}
                    onSubmit={this.handleEditUserSubmit}
                    isNew={false}
                  />,
                title: `Edit ${email}`,
              }
            )
          }
        />
      </Permissible>
    ];
  };
  
  handleCreateUserSubmit(values){
    this.props.clearFormErrors();
    this.props.createUser(values)
  }
  
  handleEditUserSubmit(values){
    this.props.editUser(values);
  };
  
  render(){
    const users = map(this.props.users, this.userWithButtons);
    const { userPermissions } = this.props;
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="People"
            cardSubtitle="Every one from your organization"
            content={
              <div>
                <Permissible
                  requiredPermissions={["users_create"]}
                >
                  <Button onClick={this.props.openModal.bind(this,types.FORM_MODAL,{title: 'Create New User', form: <UserForm onSubmit={this.handleCreateUserSubmit} isNew={true} />, fullscreen: true  })} color="primary">Create a New User</Button>
                </Permissible>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Image",
                    "Name",
                    "Title",
                    "Email",
                    "Contact",
                    "Manager",
                    `${hasPermission(userPermissions,["users_destroy"],true) ? "Delete" : ''}`,
                    `${hasPermission(userPermissions,["users_update_all"],true) ? "Edit" : ''}`
                  ]}
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
    createUser: (params) => dispatch(createUser(params,createUserSuccess,createUserFailure)),
    fetchUsers: () => { dispatch(fetchUsers(fetchUsersSuccess,fetchUsersFailure)) },
    editUser: (params) => { dispatch(editUser(params,editUserSuccess,editUserFailure))},
    clearFormErrors: () => { dispatch(clearUserCreateForm)}
  }
}

function mapStateToProps(state){
  return {
    users: state.users.allUsers,
    userPermissions: state.permissions.userPermissions
  }
}

export default Users = connect(mapStateToProps,mapDispatchToProps)(Users);
