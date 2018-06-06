import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';
import { ItemGrid, Muted } from 'components';
import Card, { CardContent } from 'material-ui/Card';
import LeaveStatsCards from "./LeaveStatsCards";
import PendingRejectedLeavesTable from './PendingRejectedLeavesTable';
import ApprovedLeavesTable from './ApprovedLeavesTable';
import {fetchAllUsersLeaveHistory} from "../../api/leave";
import {fetchAllUsersLeaveHistoryFailure, fetchAllUsersLeaveHistorySuccess} from "../../actions/leave";
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginBottom: '30px'
  },
});

class LeaveHistory extends React.Component{
  
  componentDidMount(){
    this.props.fetchLeaves({ user_id: this.props.user_id })
  }
  
  render(){
    
    const { classes, userLeaves = [], sickLeaves, annualLeaves, compensationLeaves } = this.props;
    
    const userPendingRejectedLeaves = userLeaves.filter(leave => (
      leave.status !== "approved"
    ));
    
    const userApprovedLeavesThisYear = userLeaves.filter(leave => (
      leave.start_date >= `${moment().format('YYYY')}-01-01` &&
      leave.status === "approved"
    ));
    
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <LeaveStatsCards
            sickLeaves={sickLeaves}
            annualLeaves={annualLeaves}
            compensationLeaves={compensationLeaves}
          />
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
              <Card className={classes.root}>
                <CardContent>
                  <Muted>Leaves Pending/Rejected</Muted>
                  <PendingRejectedLeavesTable
                    leaves={userPendingRejectedLeaves}
                  />
                </CardContent>
              </Card>
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
              <Card className={classes.root}>
                <CardContent>
                  <Muted>Approved Leaves In {moment().format("YYYY")}</Muted>
                  <ApprovedLeavesTable
                    leaves={userApprovedLeavesThisYear}
                  />
                </CardContent>
              </Card>
            </ItemGrid>
          </Grid>
        </ItemGrid>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    userLeaves: state.leaves.allUsersLeavesHistory[ownProps.user_id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLeaves: (params) => { dispatch(fetchAllUsersLeaveHistory(params,fetchAllUsersLeaveHistorySuccess,fetchAllUsersLeaveHistoryFailure)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LeaveHistory));