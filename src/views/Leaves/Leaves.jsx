import React from 'react';
import { Grid } from "material-ui";
import {
  RegularCard,
  ItemGrid,
  Permissible
} from "components";
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import MyLeavesTab from './MyLeavesTab';
import LeaveApprovalsTab from "./LeaveApprovalsTab";
import LeaveAdminTab from './LeaveAdminTab';
import { connect } from 'react-redux';
import {hasPermission} from "../../helpers/permissionsHelper";

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
    const { userPermissions} = this.props;
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
                    {
                      hasPermission(userPermissions,["leaves_all_leaves"]) ? <Tab label="Leave Summary" /> : null
                    }
                    
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

function mapStateToProps(state){
  return{
    userPermissions: state.permissions.userPermissions
  }
}

export default connect(mapStateToProps,null)(Leaves);
