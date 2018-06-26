import React from 'react';
import {
  RegularCard,
  ItemGrid,
} from "components";
import Checkbox from 'material-ui/Checkbox';
import { Grid } from "material-ui";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { ExpandMore } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import {
  fetchRolesSuccess,
  fetchRolesFailure,
  allowPermissionToRoleSuccess,
  allowPermissionToRoleFailure,
  revokePermissionFromRoleSuccess,
  revokePermissionFromRoleFailure,
} from "../../actions/role";
import { fetchRoles } from "../../api/role";
import { fetchPermissionsObject } from "../../api/permission";
import {fetchPermissionsObjectFailure, fetchPermissionsObjectSuccess} from "../../actions/permission";
import { allowPermissionToRole, revokePermissionFromRole } from "../../api/role";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'scroll',
  },
  table: {
    display: 'block',
    minWidth: 700,
    overflowX: 'scroll'
  },
  overflowAuto: {
    overflow: 'auto'
  }
});


class Permissions extends React.Component{
  
  componentDidMount(){
    this.props.fetchRoles();
    this.props.fetchPermissionsObject();
  }
  
  render(){
    const { classes, roles, permissionsObject } = this.props;
    
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Permissions"
            cardSubtitle="Assign or Revoke Permissions from Roles"
            content={
              <div>
                {
                  Object.keys(permissionsObject).map( (group,index) => (
                    <ExpansionPanel CollapseProps={{ classes: {container: classes.overflowAuto } }} key={index}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <span>{group}</span>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div className={classes.tableResponsive}>
                          <Table className={classes.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Permissions</TableCell>
                                {
                                  roles && roles.map((role, index) => (
                                    <TableCell key={index}>{role.title}</TableCell>
                                  ))
                                }
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              { Object.keys(permissionsObject[group]).map( (permission_id,index) => (
                                <TableRow key={index}>
                                  <TableCell style={{minWidth: "160px"}} component="th" scope="row">{permissionsObject[group][permission_id].permission_display}</TableCell>
                                  {
                                    roles && roles.map((role, index) => {
                                      let checked = permissionsObject[group][permission_id].allowed_for.includes(role.id);
                                      let params = {role_id: role.id, permission_id: permission_id};
                                      return <TableCell key={index}>
                                        <Checkbox
                                          checked={checked}
                                          onChange={() => {
                                            checked ? this.props.revokePermissionFromRole(params) : this.props.allowPermissionToRole(params);
                                          }}
                                          value="check"
                                        />
                                      </TableCell>
                                    })
                                  }
                                </TableRow>
                              ) )}
                            </TableBody>
                          </Table>
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))
                }
              
              </div>
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
    roles: state.roles.roles,
    permissionsObject: state.permissions.permissionsObj
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchRoles: () => {dispatch(fetchRoles(fetchRolesSuccess,fetchRolesFailure))},
    fetchPermissionsObject: () => {dispatch(fetchPermissionsObject(fetchPermissionsObjectSuccess,fetchPermissionsObjectFailure))},
    allowPermissionToRole: (params) => {dispatch(allowPermissionToRole(params,allowPermissionToRoleSuccess,allowPermissionToRoleFailure))},
    revokePermissionFromRole: (params) => {dispatch(revokePermissionFromRole(params,revokePermissionFromRoleSuccess,revokePermissionFromRoleFailure))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Permissions));
