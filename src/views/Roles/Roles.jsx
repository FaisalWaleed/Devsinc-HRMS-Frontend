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
import { values, map, drop } from 'lodash';
import { Link } from "react-router-dom";
import { Delete, Edit, People } from "material-ui-icons";

import {
  fetchRolesSuccess,
  fetchRolesFailure,
  deleteRoleSuccess,
  deleteRoleFailure
} from "actions/role";

class Roles extends React.Component {
  componentDidMount() {
    // this.props.const { dispatch } = this.props;
    this.props.fetchRoles(fetchRolesSuccess, fetchRolesFailure);
  }
  
  roleWithButtons = (role) => {
    const { id, title, description, department } = role;
    const requiredFields = [title, description, department]
    return [
      ...requiredFields,
      <Link to={`/roles/${id}`}><People /></Link>,
      <Link to={`/roles/edit/${id}`}><Edit /></Link>,
      <Delete onClick={() => this.props.onDeleteRole(id, deleteRoleSuccess, deleteRoleFailure)}/>
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
const mapDispatchToProps = {
  fetchRoles,
  onDeleteRole: deleteRole
};
const withConnect = connect(mapStateToProps, mapDispatchToProps)(Roles);

export default withConnect;
