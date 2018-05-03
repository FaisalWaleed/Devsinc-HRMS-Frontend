import React from 'react';
import { Grid } from "material-ui";
import Switch from 'material-ui/Switch';
import { RegularCard, Button, ItemGrid, CustomInput } from "components";
import Avatar from 'material-ui/Avatar'
import { Create, ExpandMore } from "material-ui-icons";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { withStyles } from "material-ui/styles/index";
import { Calendar, CalendarControls } from 'react-yearly-calendar'
import "assets/css/react-yearly-calendar.css";
import {
  createLeaveFailure,
  createLeaveSuccess,
  fetchLeavesFailure,
  fetchLeavesSuccess,
  nextLeaveYear,
  prevLeaveYear
} from "../../actions/leave";
import LeaveForm from './LeaveForm';
import classNames from 'classnames'
import * as types from "../../actions/actionTypes";
import { createLeave, fetchLeaves } from '../../api/leave';
import { getWeekDayDates } from "../../helpers/leavesHelper";

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
  },
  legendAvatar:{
    margin: '3px',display: 'inline' ,padding: '10px', color: 'black', fontSize: '12px'
  },
  appliedAvatar: {
    backgroundColor: 'rgba(249, 249, 13, 0.32)'
  },
  approvedAvatar: {
    backgroundColor: 'rgba(23, 249, 12, 0.32)'
  },
  rejectedAvatar: {
    backgroundColor: 'rgba(255, 10, 20, 0.64)'
  },
});

class Leaves extends React.Component{
  constructor(props){
    super(props);
    this.handleCreateLeaveSubmit = this.handleCreateLeaveSubmit.bind(this);
    this.state = {
      anchorEl: {
        id: -1
      },
      leavesFilter: {
        approved: true,
        rejected: true,
        pending: true,
      },
      allParsedLeaves: {
        approved: [],
        rejected: [],
        pending: []
      },
      currentlyDisplayedLeaves: {
        approved: [],
        rejected: [],
        pending: []
      },
      tab: 0,
    }
  }
  
  handleLeavesFilterToggleSwitch = (toggleName) => {
    this.setState(
      (prevState) => ({
        leavesFilter: { ...prevState.leavesFilter, [toggleName]: !prevState.leavesFilter[toggleName]}
      }),
      () => {
        if(this.state.leavesFilter[toggleName]){
          this.setState( prevState => ({...prevState, currentlyDisplayedLeaves: {...prevState.currentlyDisplayedLeaves, [toggleName]: this.state.allParsedLeaves[toggleName] } }));
        }
        else{
          this.setState( prevState => ({ ...prevState, currentlyDisplayedLeaves: {...prevState.currentlyDisplayedLeaves, [toggleName]: []}  }));
        }
      });
  };
  
  componentDidMount(){
    this.props.fetchLeaves();
  }
  
  componentWillReceiveProps(nextProps){
    let parsedLeaves = this.getCalendarSelectionFromLeaves(nextProps.allLeaves);
    this.setState({
      currentlyDisplayedLeaves: parsedLeaves,
      allParsedLeaves: parsedLeaves
    });
  }
  
  handleCreateLeaveSubmit(values){
    values.start_date = values.start_date.format("YYYY-MM-DD");
    values.end_date = values.end_date.format("YYYY-MM-DD");
    this.props.createLeave(values);
  }
  
  handleTab = (event, tab) => {
    this.setState({ tab });
  };
  
  getCalendarSelectionFromLeaves = (allLeaves) => {
    let calendarSelection = {
      approved: [],
      pending: [],
      rejected: []
    };
    
    allLeaves.forEach(function (leave) {
      let dates = [];
      switch (leave.status){
        //Cases should be class names that need to be applied
        case "approved":
          dates = getWeekDayDates(leave.start_date,leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.approved.push(date);
          });
          dates = [];
          break;
        case "pending":
          dates = getWeekDayDates(leave.start_date,leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.pending.push(date);
          });
          dates = [];
          break;
        case "rejected":
          dates = getWeekDayDates(leave.start_date,leave.end_date);
          dates.forEach(function (date) {
            calendarSelection.rejected.push(date);
          });
          dates = [];
          break;
        default:
      }
    });
    
    return calendarSelection;
  };
  
  render(){
    const { classes, year } = this.props;
    
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Leaves"
            cardSubtitle="Leaves summary"
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
                <ItemGrid xs={12} sm={12} md={12}>
                  <Button
                    style={{float: 'right'}}
                    color="primary"
                    onClick={
                      this.props.openModal.bind(this, types.FORM_MODAL,
                        {
                          fullscreen: 'true',
                          form: <LeaveForm onSubmit={this.handleCreateLeaveSubmit} />,
                          title: 'Leave Application',
                        }
                      )
                    }
                  >
                    Apply For Leave
                    <Create className={classes.rightIcon}/>
                  </Button>
                  <br/>
                  <Avatar className={classNames(classes.legendAvatar, classes.approvedAvatar)}>Approved</Avatar>
                  <Avatar className={classNames(classes.legendAvatar, classes.appliedAvatar)}>Applied</Avatar>
                  <Avatar className={classNames(classes.legendAvatar, classes.rejectedAvatar)}>Rejected</Avatar>
                  
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.demo}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.leavesFilter.approved}
                              onClick={this.handleLeavesFilterToggleSwitch.bind(this,"approved")}
                              value="Approved"
                            />
                          }
                          label="Approved"
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.leavesFilter.pending}
                              onClick={this.handleLeavesFilterToggleSwitch.bind(this,"pending")}
                              value="Pending"
                            />
                          }
                          label="Pending"
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.leavesFilter.rejected}
                              onClick={this.handleLeavesFilterToggleSwitch.bind(this,"rejected")}
                              value="Rejected"
                            />
                          }
                          label="Rejected"
                        />
                        
                        <CalendarControls
                          year={year}
                          onNextYear={this.props.nextLeaveYear}
                          onPrevYear={this.props.prevLeaveYear}
                          goToToday={() => alert(3)}
                          showTodayButton={true}
                        />
                        <Calendar
                          customClasses={this.state.currentlyDisplayedLeaves}
                          year={year}
                          onPickDate={(date) => alert(date)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </ItemGrid>}
                {this.state.tab === 1 && <ItemGrid xs={12} sm={12} md={12}>
                  <FormGroup row>
                    <CustomInput
                      labelText="Search"
                      id="search"
                      formControlProps={{
                        style: {margin: "0px 0 0 0"},
                        fullWidth: false
                      }}
                      inputProps={{
                        onChange: null,
                        type: "text",
                        required: "text",
                        name: "search",
                        autoComplete: "search",
                      }}
                    />
                  </FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={true}
                        onClick={() => null }
                        value="approved"
                      />
                    }
                    label="Approved"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={true}
                        onClick={() => null}
                        value="pending"
                      />
                    }
                    label="Pending"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={true}
                        onClick={() => null}
                        value="rejected"
                      />
                    }
                    label="Rejected"
                  />
                  <hr/>
                </ItemGrid>
                
                
                
                
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
    year: state.leaves.leavesTableYear,
    allLeaves: state.leaves.allLeaves
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    nextLeaveYear: () =>  { dispatch(nextLeaveYear) },
    prevLeaveYear: () =>  { dispatch(prevLeaveYear) },
    createLeave: (params) => {dispatch(createLeave(params,createLeaveSuccess,createLeaveFailure))},
    fetchLeaves: () => {dispatch(fetchLeaves(fetchLeavesSuccess,fetchLeavesFailure))}
  }
}

export default Leaves = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Leaves));