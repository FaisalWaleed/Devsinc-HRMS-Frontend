import React from 'react';
import * as types from "../../actions/actionTypes";
import { Grid } from "material-ui";
import {
  Button,
  ItemGrid,
  CustomInput,
  Muted,
  StatsCard
} from "components";
import {
  Create,
  FlightTakeoff,
  Battery60,
  Today
} from "material-ui-icons";
import LeaveForm from './LeaveForm';
import Card from 'material-ui/Card';
import CardContent from 'material-ui/Card/CardContent';
import { withStyles } from "material-ui/styles/index";
import {
  createLeaveFailure,
  createLeaveSuccess,
  fetchLeavesFailure,
  fetchLeavesSuccess,
} from "../../actions/leave";
import {createLeave, fetchLeaves} from "../../api/leave";
import { connect } from 'react-redux';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import * as moment from 'moment';
import { DateRange } from "material-ui-icons/index";
import Chip from 'material-ui/Chip';


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

  render(){
    const { classes, allLeaves } = this.props;

    const approvedLeavesThisMonth = allLeaves.filter(leave => (
      leave.start_date >= `${moment().format('YYYY')}-${moment().format('MM')}-01` &&
      leave.status === "approved by HR"
    ));

    const approvedLeavesThisYear = allLeaves.filter(leave => (
      leave.start_date >= `${moment().format('YYYY')}-01-01` &&
      leave.status === "approved by HR"
    ));



    return(
      <Grid container>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Button
              style={{ marginBottom: '40px'}}
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
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={3}>
            <StatsCard
              icon={FlightTakeoff}
              iconColor="green"
              title="Leaves This Month"
              description="3"
              statIcon={DateRange}
              statText="This month"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={3}>
            <StatsCard
              icon={Today}
              iconColor="orange"
              title="Leaves This Year"
              description="3"
              statIcon={DateRange}
              statText="This year"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={3}>
            <StatsCard
              icon={Battery60}
              iconColor="red"
              title="Leaves Remaining"
              description="3"
              statIcon={DateRange}
              statText="This year"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={3}>
            <StatsCard
              icon={FlightTakeoff}
              iconColor="purple"
              title="Your Leaves Quota"
              description="14"
              statIcon={DateRange}
              statText="Leaves quota"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Muted>In {moment().format('MMM')}</Muted>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { approvedLeavesThisMonth.length
                      ?
                      approvedLeavesThisMonth
                        .map((leave,index) => (
                            <TableRow key={index}>
                              <TableCell component="th">{leave.start_date}</TableCell>
                              <TableCell>{leave.leave_type}</TableCell>
                              <TableCell>{leave.reason}</TableCell>
                            </TableRow>
                          )
                        )
                      :
                      <TableRow>
                        <TableCell><Muted>Nothing to show</Muted></TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Muted>In 2018</Muted>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { approvedLeavesThisYear.length
                      ?
                      approvedLeavesThisYear
                        .map((leave,index) => (
                          <TableRow key={index}>
                            <TableCell component="th">{leave.start_date}</TableCell>
                            <TableCell>{leave.leave_type}</TableCell>
                            <TableCell>{leave.reason}</TableCell>
                          </TableRow>
                        ))
                      :
                      <TableRow>
                        <TableCell><Muted style={{display: 'block'}}>Nothing to show</Muted></TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardContent>
                <Muted>Your Leaves</Muted>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Current Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { allLeaves.length
                      ?
                      allLeaves
                        .filter(
                          leave => leave.start_date >= `${moment().format("YYYY")}-${moment().format("MM")}-01`
                        )
                        .map((leave,index) => (
                            <TableRow key={index}>
                              <TableCell component="th">{leave.start_date}</TableCell>
                              <TableCell>{leave.leave_type}</TableCell>
                              <TableCell>{leave.reason}</TableCell>
                              <TableCell><Chip style={{backgroundColor: 'yellow'}} label={leave.status} /></TableCell>
                            </TableRow>
                          )
                        )
                      :
                      <TableRow>
                        <TableCell><Muted>Nothing to show</Muted></TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ItemGrid>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
    allLeaves: state.leaves.allLeaves,
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