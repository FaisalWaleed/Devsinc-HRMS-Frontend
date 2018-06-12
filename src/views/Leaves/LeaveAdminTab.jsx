import React from 'react';
import { connect } from 'react-redux';
import { fetchAllLeavesSummary } from "../../api/leave";
import { fetchAllLeavesSummaryFailure, fetchAllLeavesSummarySuccess } from "../../actions/leave";
import Table, { TableCell, TableRow, TableHead, TableBody, TableSortLabel } from 'material-ui/Table'
import ToolTip from 'material-ui/Tooltip'
import { CustomInput, Muted } from 'components'
import * as types from "../../actions/actionTypes";
import LeaveHistory from './LeaveHistory';

class LeaveAdminTab extends React.Component{
  constructor(props){
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.handleLeaveRowClick = this.handleLeaveRowClick.bind(this);
    this.state = {
      orderBy: null,
      order: null,
      allLeaves: this.props.allLeaves,
      displayedLeaves: this.props.allLeaves,
      search: null
    }
  }
  
  componentDidMount(){
    this.props.fetchAllLeavesSummary();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      allLeaves: nextProps.allLeaves,
      displayedLeaves: nextProps.allLeaves
    })
  }
  
  handleSort = (property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    let data = this.state.search ? this.state.displayedLeaves : this.state.allLeaves;
    const allLeaves =
      order === 'desc'
        ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    this.setState({ allLeaves, order, orderBy });
  };
  
  handleLeavesSearchInputChange(searchTerm){
    if(searchTerm.length > 1) {
      let data = this.state.orderBy ? this.state.displayedLeaves : this.state.allLeaves;
      data = data.filter((leave) => (
        leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.month_leaves == (searchTerm.toLowerCase()) ||
        leave.year_leaves == (searchTerm.toLowerCase())
      ));
      this.setState({
        search: searchTerm,
        displayedLeaves: data
      })
    }
    else{
      this.setState({ displayedLeaves: this.state.allLeaves })
    }
  }
  
  handleLeaveRowClick(leave) {
    this.props.openModal(
      types.CONTENT_MODAL,
      {
        fullscreen: true,
        title: `Leave summary for ${leave.name}`,
        content:
          <LeaveHistory
            user_id={leave.user_id}
            sickLeaves={leave.sick_leaves}
            annualLeaves={leave.annual_leaves}
            compensationLeaves={leave.compensation_leaves}
            workFromHome={leave.work_from_home}
          />
      }
    )
  }
  
  render(){
    const { order, orderBy, displayedLeaves } = this.state;
    const tableHead = [
      { id: 'employee', numeric: false, disablePadding: false, label: 'Employee Name' },
      { id: 'sick_leaves', numeric: false, disablePadding: false, label: 'Sick Leaves'},
      { id: 'annual_leaves', numeric: false, disablePadding: false, label: 'Annual Leaves' },
      { id: 'compensation_leaves', numeric: false, disablePadding: false, label: 'Compensation Leaves' },
      { id: 'work_from_home', numeric: false, disablePadding: false, label: 'Work From Home' }
    ];
    
    return(
      <div>
        <CustomInput
          labelText="Search For a Leave"
          id="search"
          formControlProps={{
            style: {margin: "0px 0 0 0"},
            fullWidth: false
          }}
          inputProps={{
            onChange: (event) => this.handleLeavesSearchInputChange(event.target.value),
            type: "text",
            required: "text",
            name: "search",
            autoComplete: "search",
          }}
        />
        <Table>
          <TableHead>
            <TableRow>
              {
                tableHead.map((column) => (
                  <TableCell
                    key={column.id}
                    numeric={column.numeric}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <ToolTip
                      title={"Sort"}
                      placement={column.numeric ? 'bottom-end' : 'bottom-start' }
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.handleSort.bind(this,column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </ToolTip>
                  </TableCell>
                ), this)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              displayedLeaves.length ?
                displayedLeaves.map((leave,index) => (
                  <TableRow
                    onClick={ this.handleLeaveRowClick.bind(this, leave) }
                    hover
                    key={index}
                  >
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.sick_leaves}</TableCell>
                    <TableCell>{leave.annual_leaves}</TableCell>
                    <TableCell>{leave.compensation_leaves}</TableCell>
                    <TableCell>{leave.work_from_home}</TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell><Muted>No Results Found</Muted></TableCell>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
                </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    fetchAllLeavesSummary: () => { dispatch(fetchAllLeavesSummary(fetchAllLeavesSummarySuccess,fetchAllLeavesSummaryFailure)) }
  }
}

function mapStateToProps({leaves}){
  return {
    allLeaves: leaves.allLeavesSummary
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeaveAdminTab);