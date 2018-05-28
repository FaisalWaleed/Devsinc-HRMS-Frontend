import React from 'react';
import { Grid } from "material-ui";
import {
  RegularCard,
  ItemGrid
} from "components";
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import MyLeavesTab from './MyLeavesTab';
import LeaveApprovalsTab from "./LeaveApprovalsTab";
import LeaveAdminTab from './LeaveAdminTab';

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
                    <Tab label="Leave Summary" />
                  </Tabs>
                </AppBar>
                <br />
                {this.state.tab === 0 &&
                <MyLeavesTab/>
                }
                {this.state.tab === 1 &&
                  <LeaveApprovalsTab/>
                }
                {this.state.tab === 2 &&
                  <LeaveAdminTab />
                  }
              </div>
            }
          />
        </ItemGrid>
      
      </Grid>
    )
  }
}

export default Leaves;
