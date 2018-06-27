import React from 'react';
import { Grid } from "material-ui";
import { RegularCard, ItemGrid } from "components";
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { setTab } from "../../actions/ticket";
import {hasPermission} from "../../helpers/permissionsHelper";
import Loadable from "react-loadable";
import { Loading } from "../../routes/asyncComponents";

const MyTicketsTab = Loadable({
  loader: () => import("./MyTicketsTab.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});


const AssignedTicketsTab = Loadable({
  loader: () => import("./AssignedTicketsTab.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});


const TicketAdminTab = Loadable({
  loader: () => import("./TicketAdminTab.jsx"),
  loading: Loading,
  timeout: 10000, // 10 seconds
});

class Tickets extends React.Component{
  
  constructor(props){
    super(props);
  }
  
  handleTab = (event, tab) => {
    this.props.setTab({
      tab: tab
    })
  };
  
  render(){
    const { tab, userPermissions } = this.props;
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Ticket Centre"
            cardSubtitle="Report an issue"
            content={
              <div>
                <AppBar position="static" color={"inherit"}>
                  <Tabs centered scrollable fullWidth={true} value={tab} onChange={this.handleTab}>
                    <Tab label="My Tickets" />
                    <Tab label="Assigned to Me" />
                    {
                      hasPermission(userPermissions,["tickets_search"]) ? <Tab label="All Tickets" /> : null
                    }
                  </Tabs>
                </AppBar>
                <br />
                {tab === 0 && <MyTicketsTab/>}
                {tab === 1 && <AssignedTicketsTab/> }
                {tab === 2 && <TicketAdminTab/>}
              
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
  return {
    tab: state.tickets.tab,
    userPermissions: state.permissions.userPermissions
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tickets);
