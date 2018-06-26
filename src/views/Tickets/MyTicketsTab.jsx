import React from 'react';
import { Grid } from "material-ui";
import { ItemGrid, Button, CustomInput } from "components";
import TicketForm from './TicketForm';
import { Create, MoreVert } from "material-ui-icons";
import { FormGroup } from 'material-ui/Form';
import classNames from "classnames";
import * as types from "../../actions/actionTypes";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import Chip from 'material-ui/Chip';
import Menu, { MenuItem } from 'material-ui/Menu';
import TicketStatus from "./TicketStatus";
import IconButton from 'material-ui/IconButton';
import ShowTicket from './ShowTicket';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  createTicketCommentFailure, createTicketCommentSuccess,
  createTicketFailure,
  createTicketSuccess,
  fetchTicketsFailure,
  fetchTicketsSuccess, updateTicketStatusFailure, updateTicketStatusSuccess
} from "../../actions/ticket";
import {createTicket, createTicketComment, fetchTickets, updateTicketStatus} from "../../api/ticket";
import {filter, isEqual, uniqWith} from "lodash";
import {HIDE_MODAL} from "../../actions/modal";
import Hidden from 'material-ui/Hidden';


const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  listDiv: {
    backgroundColor: theme.palette.background.paper,
  },
  border: {
    borderBottom: '2px solid #eee',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 2,
  },
  bigAvatar: {
    [theme.breakpoints.up("md")]: {
      width: 60,
      height: 60,
    },
    [theme.breakpoints.down("sm")]: {
      width: 40,
      height: 40,
    },
  },
  tooltip: {
    fontSize: '15px',
    width: '150px'
  },
  chip: {
    marginTop: '10px',
    marginBottom: '10px'
  }
});


class MyTicketsTab extends React.Component{
  
  constructor(props){
    super(props);
    this.handleMyTicketsSearchInputChange= this.handleMyTicketsSearchInputChange.bind(this);
    this.handleCreateTicketSubmit = this.handleCreateTicketSubmit.bind(this);
    this.handleCreateTicketButtonClick = this.handleCreateTicketButtonClick.bind(this);
    this.handleTicketClick = this.handleTicketClick.bind(this);
    this.handleCreateCommentSubmit = this.handleCreateCommentSubmit.bind(this);
    this.state = {
      anchorEl: {
        id: -1
      },
      currentlyDisplayedMyTickets: this.props.tickets,
    }
  }
  
  componentDidMount(){
    this.props.fetchTickets();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      currentlyDisplayedMyTickets: nextProps.tickets,
    });
  }
  
  handleVertMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  
  handleVertMenuClose = () => {
    this.setState({ anchorEl: {
        id: -1
      }
    });
  };
  
  handleMyTicketsSearchInputChange(value){
    if(value.length > 2) {
      let newlyDisplayed = filter(this.props.tickets, ticket => (
        ticket.title.toLowerCase().includes(value.toLowerCase()) ||
        (ticket.description && ticket.description.toLowerCase().includes(value.toLowerCase()))
      ));
      this.setState({currentlyDisplayedMyTickets: newlyDisplayed});
    }
    else{
      this.setState({currentlyDisplayedMyTickets: this.props.tickets});
    }
  }
  
  handleCreateTicketSubmit(values){
    let allDepsChosen = false;
    let allRolesChosenDeps = [];
    let emptyIndexes = [];
    
    values.ticket_options.forEach((option,index) => {
      //check for all departments
      if(option.department_id === 0){
        allDepsChosen = true;
      }
      //check for empty objects
      if(Object.keys(option).length === 0 && option.constructor === Object){
        emptyIndexes.push(index);
      }
      if(option.role_id === 0){
        allRolesChosenDeps.push(option.department_id);
      }
    });
    
    //filter out empty objects from received objects array and remove all others if All Departments chosen
    values.ticket_options = values.ticket_options.filter( (value,index) => {
      if(allDepsChosen){
        return value.department_id === 0
      }
      else{
        return (emptyIndexes.indexOf(index) === -1) //not empty objects
          // dep exists in all roles and role is all roles
          || ((allRolesChosenDeps.indexOf(value.department_id) !== -1 ) && (value.role_id === 0))
          //dep does not exist in all roles and role is not all roles
          || ((allRolesChosenDeps.indexOf(value.department_id)) === -1 && (value.role_id !== 0))
      }
    });
    
    //remove duplicates
    values.ticket_options = uniqWith(values.ticket_options,isEqual);
    this.props.createTicket(values);
    this.props.closeModal();
  }
  
  handleCreateCommentSubmit(values){
    this.props.createTicketComment(values);
  }
  
  handleCreateTicketButtonClick(){
    this.props.openModal(types.FORM_MODAL,
      {
        fullscreen: false,
        form: <TicketForm onSubmit={this.handleCreateTicketSubmit}/>,
        title: 'New Ticket',
      }
    )
  }
  
  handleTicketClick(ticket){
    this.props.openModal(
      types.CONTENT_MODAL,
      {
        fullscreen: true,
        title: ticket.title,
        content: <ShowTicket onSubmit={this.handleCreateCommentSubmit} ticket_id={ticket.id} description={ticket.description} />
      }
    )
  }
  
  render(){
    const { classes } = this.props;
    const { currentlyDisplayedMyTickets } = this.state;
    return(
      <Grid container>
        <Hidden mdDown>
          <ItemGrid xs={12} sm={12} md={12}>
            <Button floatRightMdUp color="primary"
                    onClick={this.handleCreateTicketButtonClick}
            >
              New Ticket
              <Create className={classes.rightIcon}/>
            </Button>
            <FormGroup row>
              <CustomInput
                labelText="Search"
                id="search"
                formControlProps={{
                  style: {margin: "0px 0 0 0"},
                  fullWidth: false
                }}
                inputProps={{
                  onChange: (event) => this.handleMyTicketsSearchInputChange(event.target.value),
                  type: "text",
                  required: "text",
                  name: "search",
                  autoComplete: "search",
                }}
              />
            </FormGroup>
            <br/>
            <hr/>
          </ItemGrid>
        </Hidden>
        <Hidden smUp>
          <ItemGrid xs={12} sm={12} md={12}>
            <Button color="primary"
                    onClick={this.handleCreateTicketButtonClick}
            >
              New Ticket
              <Create className={classes.rightIcon}/>
            </Button>
          </ItemGrid>
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
                  onChange: (event) => this.handleMyTicketsSearchInputChange(event.target.value),
                  type: "text",
                  required: "text",
                  name: "search",
                  autoComplete: "search",
                }}
              />
            </FormGroup>
            <br/>
            <hr/>
          </ItemGrid>
        </Hidden>
        <ItemGrid xs={12} sm={12} md={12}>
          <div className={classes.listDiv}>
            <List>
              {
                currentlyDisplayedMyTickets ?
                  currentlyDisplayedMyTickets.length ?
                    currentlyDisplayedMyTickets.map((ticket, index) => (
                        <ListItem key={index} button className={classes.border}>
                          <ListItemAvatar style={{height: '100%'}}>
                            <Avatar
                              alt={ticket.created_by}
                              src={ticket.thumbnail}
                              className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                          </ListItemAvatar>
                          <Grid container>
                            <ItemGrid xs={12} sm={12} md={9}
                                      onClick={this.handleTicketClick.bind(this,ticket)}
                            >
                              <ListItemText
                                primary={ticket.title}
                                secondary={<span><span>{ticket.description}</span><br/>By {ticket.created_by}</span>}
                              />
                              <Hidden smUp>
                                {ticket.overall_status.open.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.open.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom" ><Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} /></Tooltip>}
                                {ticket.overall_status.closed.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.closed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#ed8768'}} label="Closed" className={classes.chip} /></Tooltip>}
                                {ticket.overall_status.completed.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.completed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#e5de5b'}} label="Completed" className={classes.chip} /></Tooltip>}
                              </Hidden>
                            </ItemGrid>
                            <ItemGrid xs={12} sm={12} md={3}>
                              <ListItemSecondaryAction>
                                <Hidden mdDown>
                                  {ticket.overall_status.open.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.open.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom" ><Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} /></Tooltip>}
                                  {ticket.overall_status.closed.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.closed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#ed8768'}} label="Closed" className={classes.chip} /></Tooltip>}
                                  {ticket.overall_status.completed.length !== 0 && <Tooltip classes={{tooltip: classes.tooltip}} title={<div> {ticket.overall_status.completed.map((user,index)=> {return <div key={index}>{user}<br/></div>})}</div>} placement="bottom"><Chip style={{backgroundColor: '#e5de5b'}} label="Completed" className={classes.chip} /></Tooltip>}
                                </Hidden>
                                <IconButton
                                  id={ticket.id}
                                  aria-label="More"
                                  aria-owns={this.state.anchorEl ? ticket.id : null}
                                  aria-haspopup="true"
                                  onClick={this.handleVertMenuClick}
                                >
                                  <MoreVert/>
                                </IconButton>
                                <Menu
                                  anchorEl={this.state.anchorEl}
                                  open={(ticket.id == this.state.anchorEl.id)}
                                  onClose={this.handleVertMenuClose}
                                  PaperProps={{
                                    style: {
                                      maxHeight: 48 * 4.5,
                                      width: 250,
                                    },
                                  }}
                                >
                                  <MenuItem key={1} onClick={() => {this.handleVertMenuClose(); this.props.updateTicketStatus({ticket_id: ticket.id, status: "Open"})}}>
                                    Mark as Open for All
                                  </MenuItem>
                                  <MenuItem key={2} onClick={() => {this.handleVertMenuClose(); this.props.updateTicketStatus({ticket_id: ticket.id, status: "Closed"})}}>
                                    Mark as Closed for All
                                  </MenuItem>
                                  <MenuItem key={3} onClick={() => {this.handleVertMenuClose(); this.props.updateTicketStatus({ticket_id: ticket.id, status: "Completed"})}}>
                                    Mark as Resolved for All
                                  </MenuItem>
                                  <MenuItem key={4} onClick={() => {this.handleVertMenuClose(); this.props.openModal(
                                    types.CONTENT_MODAL,
                                    {
                                      fullscreen: false,
                                      title: "Ticket Status",
                                      content: <TicketStatus ticket_id={ticket.id} />
                                    }
                                  )
                                  }}
                                  >
                                    Change Status For Individual
                                  </MenuItem>
                                </Menu>
                              </ListItemSecondaryAction>
                            </ItemGrid>
                          </Grid>
                        </ListItem>
                      )
                    ) : <h4>No Results Found ...</h4> : null
              }
            </List>
          </div>
        </ItemGrid>
      </Grid>
    )
  }
  
  
}

function mapStateToProps(state){
  return {
    tickets: state.tickets.createdTickets,
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    closeModal: () => { dispatch(HIDE_MODAL) },
    fetchTickets: () => { dispatch(fetchTickets(fetchTicketsSuccess,fetchTicketsFailure)) },
    updateTicketStatus: (params) => {dispatch(updateTicketStatus(params,updateTicketStatusSuccess,updateTicketStatusFailure)) },
    createTicket: (params) => { dispatch(createTicket(params,createTicketSuccess,createTicketFailure)) },
    createTicketComment: (params) => { dispatch(createTicketComment(params,createTicketCommentSuccess,createTicketCommentFailure)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MyTicketsTab));