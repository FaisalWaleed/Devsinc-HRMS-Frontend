import React from 'react';
import { Grid } from "material-ui";
import {
  RegularCard,
  ItemGrid
} from "components";
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { hasPermission } from "../../helpers/permissionsHelper";
import { setTab } from "../../actions/leave";
import Loadable from "react-loadable";
import { Loading } from "../../routes/asyncComponents";

const MyLeavesTab = Loadable({
  loader: () => import("./MyLeavesTab.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

const LeaveApprovalsTab = Loadable({
  loader: () => import("./LeaveApprovalsTab.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

const LeaveAdminTab = Loadable({
  loader: () => import("./LeaveAdminTab.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

class Leaves extends React.Component{
  constructor(props){
    super(props);
  }
  
  handleTab = (event, tab) => {
    this.props.setTab({tab: tab})
  };
  
  render(){
    const { userPermissions, tab } = this.props;
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Leaves"
            cardSubtitle="Leaves Summary"
            content={
              <div>
                <AppBar position="static" color={"inherit"}>
                  <Tabs centered scrollable fullWidth={true} value={tab} onChange={this.handleTab}>
                    <Tab label="My Leaves" />
                    <Tab label="Leave Approvals" />
                    {
                      hasPermission(userPermissions,["leaves_all_leaves"]) ? <Tab label="Leave Summary" /> : null
                    }
                  
                  </Tabs>
                </AppBar>
                <br />
                {tab === 0 && <MyLeavesTab/> }
                {tab === 1 && <LeaveApprovalsTab/> }
                {tab === 2 && <LeaveAdminTab/> }
              </div>
            }
          />
        </ItemGrid>
      
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    setTab: (params) => { dispatch(setTab(params)) }
  }
}

function mapStateToProps(state){
  return{
    tab: state.leaves.tab,
    userPermissions: state.permissions.userPermissions
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Leaves);
