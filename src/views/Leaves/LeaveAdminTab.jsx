import React from 'react';
import { connect } from 'react-redux';
import { fetchAllLeaves } from "../../api/leave";
import { fetchAllLeavesFailure, fetchAllLeavesSuccess } from "../../actions/leave";
import Table from 'material-ui/Table'
import { TableCell, TableRow, TableHead, TableBody, TableSortLabel } from 'material-ui/Table'
import ToolTip from 'material-ui/Tooltip'
import { CustomInput } from 'components'


class LeaveAdminTab extends React.Component{
  constructor(props){
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      orderBy: null,
      order: null,
      allLeaves: this.props.allLeaves
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({allLeaves: nextProps.allLeaves})
  }

  handleSort = (property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const allLeaves =
      order === 'desc'
        ? this.state.allLeaves.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.allLeaves.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ allLeaves, order, orderBy });
  };

  componentDidMount(){
    this.props.fetchAllLeaves();
  }

  render(){
    const { allLeaves } = this.props;
    const { order, orderBy } = this.state;

    const tableHead = [
      { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
      { id: 'start_date', numeric: false, disablePadding: false, label: 'Start' },
      { id: 'end_date', numeric: false, disablePadding: false, label: 'End' },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
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
              onChange: null,
              // onChange: (event) => this.handleMyTicketsSearchInputChange(event.target.value),
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
              allLeaves.map((leave,index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>{leave.id}</TableCell>
                  <TableCell>{leave.start_date}</TableCell>
                  <TableCell>{leave.end_date}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchAllLeaves: () => { dispatch(fetchAllLeaves(fetchAllLeavesSuccess,fetchAllLeavesFailure)) }
  }
}

function mapStateToProps(state){
  return {
    allLeaves: state.leaves.allLeaves
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeaveAdminTab);