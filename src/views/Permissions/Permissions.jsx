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
import { fetchRoles } from "../../api/role"

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
  }
  
  render(){
    const { classes, roles } = this.props;
  
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Permissions"
            cardSubtitle="Assign or Revoke Permissions from Roles"
            content={
              <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <span>Tickets</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Permission Modules</TableCell>
                          {
                            roles && roles.map((role, index) => (
                            <TableCell key={index}>{role.title}</TableCell>
                          ))
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={1}>
                          <TableCell component="th" scope="row">Create Ticket</TableCell>
                          <TableCell numeric>1</TableCell>
                          <TableCell numeric>2</TableCell>
                          <TableCell numeric>3</TableCell>
                          <TableCell numeric>4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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
    roles: state.roles.roles
  }
}

function mapDispatchToProps(dispatch){
    return {
      fetchRoles: () => {dispatch(fetchRoles(fetchRolesSuccess,fetchRolesFailure))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Permissions));
