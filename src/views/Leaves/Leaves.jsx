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
  fetchLeaveApprovalsFailure,
  fetchLeaveApprovalsSuccess,
  fetchLeavesFailure,
  fetchLeavesSuccess,
  nextLeaveYear,
  prevLeaveYear
} from "../../actions/leave";
import LeaveForm from './LeaveForm';
import classNames from 'classnames'
import * as types from "../../actions/actionTypes";
import { createLeave, fetchLeaves, fetchLeaveApprovals } from '../../api/leave';
import { getCalendarSelectionFromLeaves } from "../../helpers/leavesHelper";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

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
  
  handleVertMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  
  handleVertMenuClose = () => {
    this.setState({ anchorEl: {
        id: -1
      }
    });
  };
  
  componentDidMount(){
    this.props.fetchLeaves();
  }
  
  componentWillReceiveProps(nextProps){
    let parsedLeaves = getCalendarSelectionFromLeaves(nextProps.allLeaves);
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
  
  
  
  render(){
    const { classes, year, allLeaveApprovals } = this.props;
    
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
                    <Tab label="Leave Approvals" onClick={() => {this.props.fetchLeaveApprovals()}} />
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
                          fullscreen: false,
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
                {this.state.tab === 1 &&
                <ItemGrid xs={12} sm={12} md={12}>
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
                  <br/>
                  
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.demo}>
                        <List>
                          {allLeaveApprovals && allLeaveApprovals.length ?
                            allLeaveApprovals.map((leave, index) => (
                              <ListItem key={index} button className={classes.border}>
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Adelle Charles"
                                    src="data:image/png;base64,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"
                                    className={classNames(classes.avatar, classes.bigAvatar)}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  onClick={
                                    () => (this.props.openModal(
                                      types.CONTENT_MODAL,
                                      {
                                        fullscreen: false,
                                        title: leave.reason,
                                        content: leave.leave_type
                                      }
                                    ))
                                  }
                                  primary={leave.reason}
                                  secondary={leave.leave_type}
                                />
                                <ListItemSecondaryAction>
                                  <Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} />
                                  <Chip style={{backgroundColor: '#efab67'}} label="In Progress" className={classes.chip} />
                                  <IconButton
                                    id={leave.id}
                                    aria-label="More"
                                    aria-owns={this.state.anchorEl ? leave.id : null}
                                    aria-haspopup="true"
                                    onClick={this.handleVertMenuClick}
                                  >
                                    <MoreVertIcon/>
                                  </IconButton>
                                  <Menu
                                    id="long-"
                                    anchorEl={this.state.anchorEl}
                                    open={leave.id == this.state.anchorEl.id}
                                    onClose={this.handleVertMenuClose}
                                    PaperProps={{
                                      style: {
                                        maxHeight: 48 * 4.5,
                                        width: 200,
                                      },
                                    }}
                                  >
                                    <MenuItem key={1} onClick={() => {this.handleVertMenuClose(); }}>
                                      Mark as Open
                                    </MenuItem>
                                    <MenuItem key={2} onClick={() => {this.handleVertMenuClose(); }}>
                                      Mark as Closed
                                    </MenuItem>
                                    <MenuItem key={3} onClick={() => {this.handleVertMenuClose(); }}>
                                      Mark as Resolved
                                    </MenuItem>
                                  </Menu>
                                </ListItemSecondaryAction>
                              </ListItem>
                            )) : null
                          }
                        
                        </List>
                      </div>
                    </Grid>
                  </Grid>
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
    allLeaves: state.leaves.allLeaves,
    allLeaveApprovals: state.leaves.allLeaveApprovals
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    nextLeaveYear: () =>  { dispatch(nextLeaveYear) },
    prevLeaveYear: () =>  { dispatch(prevLeaveYear) },
    createLeave: (params) => {dispatch(createLeave(params,createLeaveSuccess,createLeaveFailure))},
    fetchLeaves: () => {dispatch(fetchLeaves(fetchLeavesSuccess,fetchLeavesFailure))},
    fetchLeaveApprovals: () => {dispatch(fetchLeaveApprovals(fetchLeaveApprovalsSuccess,fetchLeaveApprovalsFailure))}
  }
}

export default Leaves = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Leaves));