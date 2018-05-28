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
import "assets/css/react-yearly-calendar.css";
import {
  createLeaveStatusFailure,
  createLeaveStatusSuccess,
  fetchLeaveApprovalsFailure,
  fetchLeaveApprovalsSuccess,
} from "../../actions/leave";
import * as types from "../../actions/actionTypes";
import { fetchLeaveApprovals, createLeaveStatus } from '../../api/leave';
import MyLeavesTab from './MyLeavesTab';
import LeaveApprovalsTab from "./LeaveApprovalsTab";

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
                    <Tab label="Leave Approvals" />
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

export default Leaves = connect(null,null)(Leaves);
