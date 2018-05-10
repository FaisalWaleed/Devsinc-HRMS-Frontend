import React from 'react';
import {
  RegularCard,
  ItemGrid,
} from "components";
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
} from "../../actions/role";
import { fetchRoles } from "../../api/role";
import { fetchPermissionsObject } from "../../api/permission";
import {fetchPermissionsObjectFailure, fetchPermissionsObjectSuccess} from "../../actions/permission";

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
                    <ExpansionPanel key={index}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <span>{group}</span>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
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
                            { permissionsObject[group].map( (value,index) => (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">{value.permission_display}</TableCell>
                                <TableCell numeric>Yes no based on value.allowed_for</TableCell>
                                <TableCell numeric>2</TableCell>
                                <TableCell numeric>3</TableCell>
                                <TableCell numeric>4</TableCell>
                              </TableRow>
                            ) )}
                          </TableBody>
                        </Table>
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
      fetchPermissionsObject: () => {dispatch(fetchPermissionsObject(fetchPermissionsObjectSuccess,fetchPermissionsObjectFailure))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Permissions));
