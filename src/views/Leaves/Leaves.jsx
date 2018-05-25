import React from 'react';
import { Grid } from "material-ui";
import {
  RegularCard,
  Button,
  ItemGrid,
  CustomInput,
  StatsCard
} from "components";
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { withStyles } from "material-ui/styles/index";
import "assets/css/react-yearly-calendar.css";
import {
  createLeaveFailure,
  createLeaveStatusFailure, createLeaveStatusSuccess, createLeaveSuccess,
  fetchLeaveApprovalsFailure,
  fetchLeaveApprovalsSuccess,
} from "../../actions/leave";
import * as types from "../../actions/actionTypes";
import { createLeave, fetchLeaveApprovals, createLeaveStatus } from '../../api/leave';
import MyLeavesTab from './MyLeavesTab';
import LeaveApprovalsTab from "./LeaveApprovalsTab";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  border: {
    borderBottom: '2px solid #eee',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  tooltip: {
    fontSize: '15px'
  }
});

class Leaves extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
    }
  }
  
  handleTab = (event, tab) => {
    this.setState({ tab });
  };
  
  render(){
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Leaves"
            cardSubtitle="Leaves Summary"
            content={
              <div>
                <AppBar position="static" color={"inherit"}>
                  <Tabs centered={true} fullWidth={true} value={this.state.tab} onChange={this.handleTab}>
                    <Tab label="My Leaves" />
                    <Tab label="Leave Approvals" onClick={() => {this.props.fetchLeaveApprovals()}} />
                  </Tabs>
                </AppBar>
                <br />
                {this.state.tab === 0 &&
                <MyLeavesTab/>
                }
                {this.state.tab === 1 &&
                  <LeaveApprovalsTab/>
                }
                {/*Third component here to show leave summary of all Users */}
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
    allLeaveApprovals: state.leaves.allLeaveApprovals
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    fetchLeaveApprovals: () => { dispatch(fetchLeaveApprovals(fetchLeaveApprovalsSuccess,fetchLeaveApprovalsFailure))},
    createLeaveStatus: (params) => { dispatch(createLeaveStatus(params,createLeaveStatusSuccess,createLeaveStatusFailure))},
  }
}

export default Leaves = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Leaves));
