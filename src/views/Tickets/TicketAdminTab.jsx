import React from 'react';
import Table, { TableCell, TableRow, TableHead, TableBody, TableSortLabel } from 'material-ui/Table'
import { Grid } from "material-ui";
import { ItemGrid } from 'components';
import Tooltip from 'material-ui/Tooltip';
import { connect } from 'react-redux';
import {fetchAllTicketsFailure, fetchAllTicketsSuccess} from "../../actions/ticket";
import {fetchAllTickets} from "../../api/ticket";
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  tooltip: {
    fontSize: '15px',
    width: '150px'
  }
});

class TicketAdminTab extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      orderBy: null,
      order: null,
      displayedTickets: this.props.allTickets,
      allTickets: this.props.allTickets,
      search: null
    }
  }
  
  componentDidMount(){
    this.props.fetchAllTickets();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      displayedTickets: nextProps.allTickets,
      allTickets: nextProps.allTickets
    })
  }
  
  handleSort = (property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    let data = this.state.search ? this.state.displayedTickets : this.state.allTickets;
    const displayedTickets =
      order === 'desc'
        ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    this.setState({ displayedTickets, order, orderBy });
  };
  
  render(){
    const tableHead = [
      { id: 'by', numeric: false, disablePadding: false, label: 'By' },
      { id: 'date', numeric: false, disablePadding: false, label: 'Date Started' },
      { id: 'statement', numeric: false, disablePadding: false, label: 'Title' },
      { id: 'department', numeric: false, disablePadding: false, label: 'Department' },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
    ];
    
    const { displayedTickets, order, orderBy } = this.state;
    const { classes } = this.props;
    
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
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
                      <Tooltip
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
                      </Tooltip>
                    </TableCell>
                  ), this)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                displayedTickets.map((ticket,index) => (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>{ticket.created_by}</TableCell>
                    <TableCell>{moment(ticket.created_at).format("Do MMM YYYY")}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>
                      {ticket.overall_status.open.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.open.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom" ><Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} /></Tooltip>}
                      {ticket.overall_status.closed.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.closed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#ed8768'}} label="Closed" className={classes.chip} /></Tooltip>}
                      {ticket.overall_status.completed.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.completed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#e5de5b'}} label="Completed" className={classes.chip} /></Tooltip>}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </ItemGrid>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
    allTickets: state.tickets.allTickets
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchAllTickets: () => { dispatch(fetchAllTickets(fetchAllTicketsSuccess,fetchAllTicketsFailure)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TicketAdminTab));