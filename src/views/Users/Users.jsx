import React from 'react';
import { Grid } from "material-ui";
import { CustomInput, RegularCard, Button, ItemGrid, Permissible, Muted } from "components";
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
import { hasPermission } from "../../helpers/permissionsHelper";
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import Table, { TableRow, TableHead, TableCell, TableBody } from 'material-ui/Table'
import { withStyles } from 'material-ui/styles';
import tableStyle from "variables/styles/tableStyle";
import { Link } from 'react-router-dom';

class Users extends React.Component{
  constructor(props){
    super(props);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleEditUserSubmit = this.handleEditUserSubmit.bind(this);
    this.handleUserRowClick = this.handleUserRowClick.bind(this);
    this.handleUsersSearchInputChange = this.handleUsersSearchInputChange.bind(this);
    this.state = {
      currentlyDisplayedUsers: this.props.users
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentlyDisplayedUsers: nextProps.users
    })
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleUserRowClick(){

  }

  handleCreateUserSubmit(values){
    this.props.clearFormErrors();
    this.props.createUser(values)
  }

  handleEditUserSubmit(values){
    this.props.editUser(values);
  };

  handleUsersSearchInputChange(searchTerm){
    if(searchTerm.length > 2) {
      this.setState({
        currentlyDisplayedUsers: this.props.users.filter((user) => (
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      })
    }
    else{
      this.setState({
        currentlyDisplayedUsers: this.props.users
      })
    }
  }

  render(){
    const { userPermissions, classes } = this.props;
    const { currentlyDisplayedUsers } = this.state;
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="People"
            cardSubtitle="Every one from your organization"
            content={
              <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                  <Permissible
                    requiredPermissions={["users_create"]}
                  >
                    <Button onClick={this.props.openModal.bind(this,types.FORM_MODAL,{title: 'Create New User', form: <UserForm onSubmit={this.handleCreateUserSubmit} isNew={true} />, fullscreen: true  })} color="primary">Create a New User</Button>
                  </Permissible>
                  <br />
                  <CustomInput
                    labelText="Search People"
                    id="search"
                    formControlProps={{
                      style: {margin: "0px 0 0 0"},
                      fullWidth: false
                    }}
                    inputProps={{
                      onChange: (event) => this.handleUsersSearchInputChange(event.target.value),
                      type: "text",
                      required: "text",
                      name: "search",
                      autoComplete: "search",
                    }}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={12}>
                  <div className={classes.tableResponsive}>
                    <Table className={classes.table}>
                      <TableHead className={classes.primaryTableHeader}>
                        <TableRow>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Image</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Name</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Title</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Email</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Contact</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Manager</TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                            {hasPermission(userPermissions,["users_update_all"],true) ? "Edit" : ''}
                          </TableCell>
                          <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>
                            {hasPermission(userPermissions,["users_destroy"],true) ? "Delete" : ''}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        { currentlyDisplayedUsers.length ?
                          currentlyDisplayedUsers.map((user,index) => (
                            <TableRow key={index}
                                      onClick={this.handleUserRowClick.bind(this,user)}
                                      hover
                            >
                              <TableCell className={classes.tableCell}>
                                <Link to={`/people/${user.id}`}><Avatar src={user.image} /> </Link>
                              </TableCell>
                              <TableCell className={classes.tableCell}><Link style={{color: 'black'}} to={`/people/${user.id}`}>{user.name}</Link></TableCell>
                              <TableCell className={classes.tableCell}><Link style={{color: 'black'}} to={`/people/${user.id}`}>{user.title}</Link></TableCell>
                              <TableCell className={classes.tableCell}><Link style={{color: 'black'}} to={`/people/${user.id}`}>{user.email}</Link></TableCell>
                              <TableCell className={classes.tableCell}><Link style={{color: 'black'}} to={`/people/${user.id}`}>{user.contact_number}</Link></TableCell>
                              <TableCell className={classes.tableCell}><Tooltip title={user.manager.name}><Link to={`/people/${user.manager.id}`}><Avatar src={user.manager.image}/></Link></Tooltip></TableCell>
                              <TableCell className={classes.tableCell}>
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
                                                id: user.id,
                                                email: user.email,
                                                first_name: user.first_name,
                                                last_name: user.last_name,
                                                title: user.title,
                                                reporting_to: user.reporting_to,
                                                buddy_id: user.buddy_id,
                                                dob: user.dob,
                                                contact_number: user.contact_number,
                                                emergency_contact_person_number: user.emergency_contact_person_number,
                                                emergency_contact_person_relation: user.emergency_contact_person_relation,
                                                permanent_address: user.permanent_address,
                                                join_date: user.join_date,
                                                employment_history: user.employment_history,
                                              }}
                                              onSubmit={this.handleEditUserSubmit}
                                              isNew={false}
                                            />,
                                          title: `Edit ${user.email}`,
                                        }
                                      )
                                    }
                                  />
                                </Permissible>
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {user.deleted_at ?
                                  <Permissible
                                    requiredPermissions={["users_restore_user"]}
                                  >
                                    <Tooltip title={`Unblock ${user.name}`}>
                                      <Lock
                                        onClick={
                                          this.props.openModal.bind(this,
                                            types.DELETE_MODAL,
                                            {
                                              deleteAction: activateUser(user.id, activateUserSuccess, activateUserFailure),
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
                                    <Tooltip title={`Block ${user.name}`}>
                                      <LockOpen style={{'marginRight': '10px'}}
                                                onClick={
                                                  this.props.openModal.bind(this,
                                                    types.DELETE_MODAL,
                                                    {
                                                      deleteAction: deleteUser(
                                                        user.id,
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
                                  </Permissible>
                                }
                              </TableCell>
                            </TableRow>
                          ))
                          :
                          <TableRow>
                            <TableCell><Muted style={{display: 'block'}}>Nothing to show</Muted></TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </div>
                </ItemGrid>
              </Grid>
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

export default Users = connect(mapStateToProps,mapDispatchToProps)(withStyles(tableStyle)(Users));
