import React from 'react';
import * as types from "../../actions/actionTypes";
import { Grid } from "material-ui";
import {
  Button,
  ItemGrid,
  Muted
} from "components";
import { Create } from "material-ui-icons";
import LeaveForm from './LeaveForm';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from "material-ui/styles/index";
import {
  createLeaveFailure,
  createLeaveSuccess,
  fetchLeavesFailure,
  fetchLeavesSuccess,
} from "../../actions/leave";
import {createLeave, fetchLeaves} from "../../api/leave";
import { connect } from 'react-redux';
import * as moment from 'moment';
import {getTotalLeaves} from "../../helpers/leavesHelper";
import LeaveStatsCards from "./LeaveStatsCards";
import PendingRejectedLeavesTable from './PendingRejectedLeavesTable';
import ApprovedLeavesTable from './ApprovedLeavesTable';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginBottom: '30px'
  },
  table: {
    minWidth: '400px'
  }
});

class MyLeavesTab extends React.Component{
  
  constructor(props){
    super(props);
    this.handleCreateLeaveSubmit = this.handleCreateLeaveSubmit.bind(this);
  }
  
  componentDidMount(){
    this.props.fetchLeaves();
  }
  
  handleCreateLeaveSubmit(values){
    values.start_date = values.start_date.format("YYYY-MM-DD");
    values.end_date = values.end_date.format("YYYY-MM-DD");
    this.props.createLeave(values);
  }
  
  handleCreateLeaveClick(){
    this.props.openModal(
      types.FORM_MODAL,
      {
        fullscreen: false,
        form: <LeaveForm onSubmit={this.handleCreateLeaveSubmit} />,
        title: 'Leave Application',
      }
    )
  }
  
  render(){
    const { classes, currentUserLeaves } = this.props;
    
    const currentUserPendingRejectedLeaves = currentUserLeaves.filter(leave => (
      leave.status !== "approved"
    ));
    
    const approvedLeavesThisYear = currentUserLeaves.filter(leave => (
      leave.start_date >= `${moment().format('YYYY')}-01-01` &&
      leave.status === "approved"
    ));
    
    const annualLeavesThisYear = approvedLeavesThisYear.filter(leave => (
      leave.leave_type === "annual"
    ));
    
    const sickLeavesThisYear = approvedLeavesThisYear.filter(leave => (
      leave.leave_type === 'sick'
    ));
    
    const compensationLeavesThisYear = approvedLeavesThisYear.filter(leave => (
      leave.leave_type === 'compensation'
    ));
    
    return(
      <Grid container>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Button
              style={{ marginBottom: '40px'}}
              color="primary"
              onClick={this.handleCreateLeaveClick.bind(this)}
            >
              Apply For Leave
              <Create className={classes.rightIcon}/>
            </Button>
          </ItemGrid>
        </Grid>
        <LeaveStatsCards
          annualLeaves={getTotalLeaves(annualLeavesThisYear)}
          sickLeaves={getTotalLeaves(sickLeavesThisYear)}
          compensationLeaves={getTotalLeaves(compensationLeavesThisYear)}
        />
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Muted>Leaves Pending/Rejected</Muted>
                <PendingRejectedLeavesTable
                  leaves={currentUserPendingRejectedLeaves}
                />
              </CardContent>
            </Card>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Muted>Approved Leaves In {moment().format("YYYY")}</Muted>
                <ApprovedLeavesTable
                  leaves={approvedLeavesThisYear}
                />
              </CardContent>
            </Card>
          </ItemGrid>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps({leaves}){
  return {
    currentUserLeaves: leaves.currentUserLeaves,
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    fetchLeaves: () => { dispatch(fetchLeaves(fetchLeavesSuccess,fetchLeavesFailure))},
    createLeave: (params) => { dispatch(createLeave(params,createLeaveSuccess,createLeaveFailure))}
  }
}

export default MyLeavesTab = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MyLeavesTab));