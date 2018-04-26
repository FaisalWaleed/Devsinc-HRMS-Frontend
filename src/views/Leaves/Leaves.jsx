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
import { nextLeaveYear, prevLeaveYear } from "../../actions/leave";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from 'classnames'

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
  leaveAvatar: {
    backgroundColor: 'rgba(249, 24, 8, 0.32)'
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

const calendarSelection = {
  leave: [
    '2018-04-25',
    '2018-05-01',
    '2018-06-02',
    '2018-08-15',
    '2018-11-01'
  ],
  approved: [
    '2018-04-14',
    '2018-05-12',
    '2018-06-13',
    '2018-08-06',
    '2018-11-19'
  ],
  rejected: [
    '2018-04-11',
    '2018-05-29',
    '2018-06-22',
    '2018-08-12',
    '2018-11-14'
  ],
  applied: [
    '2018-04-17',
    '2018-05-12',
    '2018-06-25',
    '2018-08-30',
    '2018-11-01'
  ]
};

class Leaves extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      anchorEl: {
        id: -1
      },
      leaves_filter: {
        approved: true,
        rejected: true,
        pending: true
      },
      tab: 0,
    }
  }
  
  handleTab = (event, tab) => {
    this.setState({ tab });
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
                  <Button style={{float: 'right'}} color="primary">
                    Apply For Leave
                    <Create className={classes.rightIcon}/>
                  </Button>
                  <br/>
                  <Avatar className={classNames(classes.legendAvatar, classes.leaveAvatar)}>Leave</Avatar>
                  <Avatar className={classNames(classes.legendAvatar, classes.appliedAvatar)}>Applied</Avatar>
                  <Avatar className={classNames(classes.legendAvatar, classes.approvedAvatar)}>Approved</Avatar>
                  <Avatar className={classNames(classes.legendAvatar, classes.rejectedAvatar)}>Rejected</Avatar>
                  
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.demo}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onClick={null}
                              value="Sick"
                            />
                          }
                          label="Sick Leaves"
                        />
  
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onClick={null}
                              value="Approved"
                            />
                          }
                          label="Approved"
                        />
  
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onClick={null}
                              value="Applied"
                            />
                          }
                          label="Applied"
                        />
  
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onClick={null}
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
                          customClasses={calendarSelection}
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
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.demo}>
                      
                      
                      </div>
                    </Grid>
                  </Grid>
                </ItemGrid>}
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
    year: state.leaves.leavesTableYear
  }
}

function mapDispatchToProps(dispatch){
  return {
    nextLeaveYear: () =>  { dispatch(nextLeaveYear) },
    prevLeaveYear: () =>  { dispatch(prevLeaveYear) }
  }
}

export default Leaves = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Leaves));