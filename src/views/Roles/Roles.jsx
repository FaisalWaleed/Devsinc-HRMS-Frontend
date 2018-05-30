import React from "react";
import { Grid } from "material-ui";

import {
  RegularCard,
  Table,
  ItemGrid,
  Button
} from "components";

import { connect } from "react-redux";
import {
  fetchRoles,
  deleteRole
} from "api/role"
import { map } from 'lodash';
import { Link } from "react-router-dom";
import { Delete, Edit, People } from "material-ui-icons";

import {
  fetchRolesSuccess,
  fetchRolesFailure,
  deleteRoleSuccess,
  deleteRoleFailure
} from "actions/role";
import * as types from "../../actions/actionTypes";

class Roles extends React.Component {
  componentDidMount() {
    this.props.fetchRoles();
  }
  
  roleWithButtons = (role) => {
    const { id, title, description, department } = role;
    const requiredFields = [title, description, department]
    return [
      ...requiredFields,
      <Link to={`/roles/${id}`}><People /></Link>,
      <Link to={`/roles/edit/${id}`}><Edit /></Link>,
      <Delete
        onClick={
          this.props.openModal.bind(this,
            types.DELETE_MODAL,
            {
              deleteAction: this.props.onDeleteRole(
                id,
                deleteRoleSuccess,
                deleteRoleFailure
              ),
              resourceType: 'role'
            }
          )
        }
      />,
    ];
  }
  
  render() {
    const roles = map(this.props.roles, this.roleWithButtons);
    
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="All Roles"
            cardSubtitle="Here is a list of all roles for the company"
            content={
              <div>
                <Button color="primary">
                  <Link style={{color: 'white'}} to="/roles/new">New Role</Link>
                </Button>
                <Button color="primary">
                  <Link style={{color: 'white'}} to="/roles/permissions">Modify Permissions</Link>
                </Button>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Title", "Description", "Department", "Users", "Edit", "Delete"]}
                  tableData={roles}
                />
              </div>
            }
          />
        </ItemGrid>
      </Grid>
    );
  }
}
function mapStateToProps({ roles }) {
  return {
    roles: roles.roles
  };
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType, modalProps = null) => { dispatch({type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    fetchRoles: () => {dispatch(fetchRoles(fetchRolesSuccess,fetchRolesFailure))},
    onDeleteRole: deleteRole
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
