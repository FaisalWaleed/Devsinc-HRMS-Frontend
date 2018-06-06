import React from 'react';
import * as types from "../../actions/actionTypes";
import { connect } from 'react-redux';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from "material-ui/styles/index";
import LeavesLifeCycle from './LeavesLifeCycle';
import moment from 'moment';
import { Muted } from 'components';

const styles = theme => ({
  table: {
    minWidth: '400px'
  }
});

class ApprovedLeavesTable extends React.Component{
  
  handleLeaveLifeCycleClick(leave){
    this.props.openModal(
      types.CONTENT_MODAL,
      {
        fullscreen: false,
        title: `Leave Details`,
        content: <LeavesLifeCycle reason={leave.reason} leaveId={leave.id} />
      }
    )
  }
  
  render(){
    const { leaves, classes} = this.props;
    
    return(
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { leaves.length ?
            leaves.map((leave,index) => (
              <TableRow key={index}
                        onClick={this.handleLeaveLifeCycleClick.bind(this,leave)}
                        hover
              >
                <TableCell component="th">{moment(leave.start_date).format("Do MMM")}</TableCell>
                <TableCell component="th">{moment(leave.end_date).format("Do MMM")}</TableCell>
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
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
  }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(ApprovedLeavesTable));