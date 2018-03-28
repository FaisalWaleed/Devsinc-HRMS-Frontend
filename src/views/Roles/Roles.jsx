import React from "react";
import { Grid } from "material-ui";

import { RegularCard, 
  Table, 
  ItemGrid 
} from "components";

import { connect } from "react-redux";
import { 
  fetchRoles, 
  deleteRole 
} from "api/role"
import { values, map, drop } from 'lodash';
import RegularButton from "components/CustomButtons/Button"
import { Link } from "react-router-dom";
import { Delete, Edit } from "material-ui-icons";

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
    const { id } = role;

    return [
      ...drop(values(role)),
      <Delete onClick={() => this.props.onDeleteRole(id, deleteRoleSuccess, deleteRoleFailure)}/>, 
      <Link to={`/Roles/edit/${id}`}><Edit /></Link>
    ];  
  }

  render() {
    const roles = map(this.props.roles, this.roleWithButtons);

    return (
      <div>
        <RegularButton>
          <Link to="/roles/new">New Role</Link>
        </RegularButton>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Simple Table"
              cardSubtitle="Here is a subtitle for this table"
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Title", "Description", "Actions"]}
                  tableData={roles}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
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
