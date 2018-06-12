import React from 'react';
import Table, { TableCell, TableRow, TableHead, TableBody, TableSortLabel } from 'material-ui/Table'
import { Grid } from "material-ui";
import { ItemGrid, CustomInput, Button } from 'components';
import Tooltip from 'material-ui/Tooltip';
import { connect } from 'react-redux';
import {fetchSearchedTicketsFailure, fetchSearchedTicketsSuccess} from "../../actions/ticket";
import {fetchSearchedTickets} from "../../api/ticket";
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import {filter} from "lodash";
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import TicketAdminSearchForm from "./TicketAdminSearchForm";

const styles = theme => ({
  tooltip: {
    fontSize: '15px',
    width: '150px'
  },
  formControl: {
    margin: "0 0 0 0",
  }
});

class TicketAdminTab extends React.Component{

  constructor(props){
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = {
      orderBy: null,
      order: null,
      displayedTickets: this.props.allTickets,
      filters: {
        status: ""
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      displayedTickets: nextProps.allTickets,
    })
  }

  handleSort = (property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    let data = this.state.displayedTickets;
    const displayedTickets =
      order === 'desc'
        ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    this.setState({ displayedTickets, order, orderBy });
  };

  filterDisplayedTickets(value){
    if(value.length > 2) {
      const {filters} = this.state;
      let filteredTickets = this.props.allTickets;
      for (let property in filters){
        if(filters[property].length > 2) {
          filteredTickets = filter(filteredTickets, ticket => (
            isNaN(ticket[property])
              ? ticket[property].toLowerCase().includes(filters[property].toLowerCase())
              : ticket[property].includes(filters[property].toLowerCase())
          ))
        }
      }
      this.setState({displayedTickets: filteredTickets});
    }
    else{
      this.setState({displayedTickets: this.props.allTickets});
    }
  }

  handleTableColumnSearch(property,value){
    this.setState(
      prevState => (
        {...prevState, filters: {...prevState.filters, [property]: value}}), () => this.filterDisplayedTickets(value));
  }

  handleSearchSubmit(values){
    values.start_date ? values.start_date = values.start_date.format("YYYY-MM-DD") : null;
    values.end_date ? values.end_date = values.end_date.format("YYYY-MM-DD") : null;
    console.log(values);
    this.props.fetchSearchedTickets(values);
  }
  
  render(){
    const tableHead = [
      { id: 'created_by', numeric: false, disablePadding: false, label: 'By', type: "search" },
      { id: 'created_at', numeric: false, disablePadding: false, label: 'Date Started', type: "search" },
      { id: 'title', numeric: false, disablePadding: false, label: 'Title', type: "search" },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status', type: "dropdown", options: ["Open","Closed","Resolved"]}
    ];

    const { displayedTickets, order, orderBy, filters } = this.state;
    const { classes } = this.props;

    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Button color="primary"><Link style={{color: "#FFFFFF"}} to={"/tickets/admin/statistics"}>Statistics</Link></Button>
          <br /><br />
          <TicketAdminSearchForm onSubmit={this.handleSearchSubmit} />
          <br/>
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
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.handleSort.bind(this,column.id)}
                      >
                        {
                          column.type === "search" ?
                            <CustomInput
                              labelText={column.label}
                              id="search"
                              formControlProps={{
                                style: {margin: "27px 0 0 0"},
                                fullWidth: false
                              }}
                              inputProps={{
                                onChange: (event) => this.handleTableColumnSearch(column.id, event.target.value),
                                type: "text",
                                required: "text",
                                name: "search",
                                autoComplete: "search",
                              }}
                            /> : null
                        }
                        {
                          column.type === "dropdown" ?
                            <CustomInput
                              isSelect={true}
                              formControlProps={{
                                fullWidth: true
                              }}
                              labelText={"Status"}
                              inputProps={{
                                value: filters.status ? filters.status : "*",
                                onChange: (event) => (this.handleTableColumnSearch(column.id,event.target.value)),
                                required: "required",
                                name: "search",
                                autoComplete: "search",
                              }}
                            >
                              <MenuItem value={"*"} key="all">
                                <ListItemText primary={"All"}/>
                              </MenuItem>
                              {
                                column.options.map((option,index) => (
                                  <MenuItem value={option} key={index}>
                                    <ListItemText primary={option}/>
                                  </MenuItem>
                                ))
                              }
                            </CustomInput>
                            : null
                        }
                      </TableSortLabel>
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
                    <TableCell>
                      {ticket.status === "Open" && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.open.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom" ><Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} /></Tooltip>}
                      {ticket.status === "Closed" && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.closed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#ed8768'}} label="Closed" className={classes.chip} /></Tooltip>}
                      {ticket.status === "Completed" && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.completed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#e5de5b'}} label="Completed" className={classes.chip} /></Tooltip>}
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
    allTickets: state.tickets.searchedTickets
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchSearchedTickets: (params) => { dispatch(fetchSearchedTickets(params,fetchSearchedTicketsSuccess,fetchSearchedTicketsFailure)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TicketAdminTab));