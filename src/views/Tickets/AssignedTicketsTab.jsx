import React from 'react';
import { Grid } from "material-ui";
import { ItemGrid, CustomInput } from "components";
import classNames from "classnames";
import * as types from "../../actions/actionTypes";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MoreVert } from 'material-ui-icons';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ShowTicket from './ShowTicket';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import {
  createTicketCommentFailure, createTicketCommentSuccess,
  fetchAssignedTicketsFailure,
  fetchAssignedTicketsSuccess, updateTicketStatusFailure,
  updateTicketStatusSuccess
} from "../../actions/ticket";
import {createTicketComment, fetchAssignedTickets, updateTicketStatus} from "../../api/ticket";
import {filter} from "lodash";
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
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
  }
});

class AssignedTicketsTab extends React.Component{
  
  constructor(props){
    super(props);
    this.handleAssignedTicketsSearchInputChange = this.handleAssignedTicketsSearchInputChange.bind(this);
    this.handleCreateCommentSubmit = this.handleCreateCommentSubmit.bind(this);
    this.state = {
      anchorEl: {
        id: -1
      },
      assigned_tickets_filter: {
        open: true,
        closed: true,
        completed: true
      },
      currentlyDisplayedAssignedTickets: this.props.assignedTickets,
    }
  }
  
  componentDidMount(){
    this.props.fetchAssignedTickets();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState(
      {
        currentlyDisplayedAssignedTickets: nextProps.assignedTickets
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
  
  handleAssignedTicketsToggleSwitch = (toggleName) => {
    this.setState(prevState => ({
      assigned_tickets_filter: { ...prevState.assigned_tickets_filter, [toggleName]: !prevState.assigned_tickets_filter[toggleName]}
    }));
  };
  
  handleAssignedTicketsSearchInputChange(value){
    if(value.length > 2) {
      let newlyDisplayed = filter(this.props.assignedTickets, ticket => (ticket.title.toLowerCase().includes(value.toLowerCase()) || (ticket.description && ticket.description.toLowerCase().includes(value.toLowerCase()))));
      this.setState({currentlyDisplayedAssignedTickets: newlyDisplayed});
    }
    else{
      this.setState({
        currentlyDisplayedAssignedTickets: this.props.assignedTickets
      });
    }
  }
  
  handleCreateCommentSubmit(values){
    this.props.createTicketComment(values);
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
    const { currentlyDisplayedAssignedTickets} = this.state;
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={3}>
          <FormGroup row>
            <CustomInput
              labelText="Search"
              id="search"
              formControlProps={{
                style: {margin: "0px 0 0 0"},
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => this.handleAssignedTicketsSearchInputChange(event.target.value),
                type: "text",
                required: "text",
                name: "search",
                autoComplete: "search",
              }}
            />
          </FormGroup>
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12}/>
        <ItemGrid xs={5} sm={5} md={2}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.assigned_tickets_filter.open}
                onClick={() => (this.handleAssignedTicketsToggleSwitch("open"))}
                value="open"
              />
            }
            label="Open"
          />
        </ItemGrid>
        <ItemGrid xs={5} sm={5} md={2}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.assigned_tickets_filter.closed}
                onClick={() => (this.handleAssignedTicketsToggleSwitch("closed"))}
                value="closed"
              />
            }
            label="Closed"
          />
        </ItemGrid>
        <ItemGrid xs={5} sm={5} md={2}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.assigned_tickets_filter.completed}
                onClick={() => (this.handleAssignedTicketsToggleSwitch("completed"))}
                value="completed"
              />
            }
            label="Completed"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12}>
          <hr/>
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12}>
          <div className={classes.listDiv}>
            <List>
              {
                currentlyDisplayedAssignedTickets ?
                  currentlyDisplayedAssignedTickets.length ?
                    currentlyDisplayedAssignedTickets.map((ticket, index) => (
                        (this.state.assigned_tickets_filter.open && ticket.status === "Open")
                        || (this.state.assigned_tickets_filter.closed && ticket.status === "Closed")
                        || (this.state.assigned_tickets_filter.completed && ticket.status === "Completed")
                          ?
                          <ListItem key={index} button className={classes.border}>
                            <ListItemAvatar>
                              <Avatar
                                alt={ticket.created_by}
                                src={ticket.thumbnail}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                              />
                            </ListItemAvatar>
                            <Grid container>
                              <ItemGrid xs={12} sm={12} md={9} onClick={ this.handleTicketClick.bind(this,ticket) }>
                                <ListItemText
                                  primary={ticket.title}
                                  secondary={<div><span>{ticket.description}</span><br/>By {ticket.created_by} </div> }
                                />
                                <Hidden smUp>
                                  {ticket.status === "Open" && <Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} />}
                                  {ticket.status === "In Progress" && <Chip style={{backgroundColor: '#efab67'}} label="In Progress" className={classes.chip} />}
                                  {ticket.status === "Closed" && <Chip style={{backgroundColor: '#ed8768'}} label="Closed" className={classes.chip} />}
                                  {ticket.status === "Completed" && <Chip style={{backgroundColor: '#e5de5b'}} label="Completed" className={classes.chip} />}
                                </Hidden>
                              </ItemGrid>
                              <ItemGrid xs={12} sm={12} md={3}>
                                
                                <ListItemSecondaryAction>
                                  <Hidden mdDown>
                                    {ticket.status === "Open" && <Chip style={{backgroundColor: '#94d863'}} label="Open" className={classes.chip} />}
                                    {ticket.status === "In Progress" && <Chip style={{backgroundColor: '#efab67'}} label="In Progress" className={classes.chip} />}
                                    {ticket.status === "Closed" && <Chip style={{backgroundColor: '#ed8768'}} label="Closed" className={classes.chip} />}
                                    {ticket.status === "Completed" && <Chip style={{backgroundColor: '#e5de5b'}} label="Completed" className={classes.chip} />}
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
                                    id="long-"
                                    anchorEl={this.state.anchorEl}
                                    open={ticket.id == this.state.anchorEl.id}
                                    onClose={this.handleVertMenuClose}
                                    PaperProps={{
                                      style: {
                                        maxHeight: 48 * 4.5,
                                        width: 200,
                                      },
                                    }}
                                  >
                                    <MenuItem key={1} onClick={() => {this.handleVertMenuClose(); this.props.updateTicketStatus({ticket_id: ticket.id, status: "Open"})}}>
                                      Mark as Open
                                    </MenuItem>
                                    <MenuItem key={2} onClick={() => {this.handleVertMenuClose(); this.props.updateTicketStatus({ticket_id: ticket.id, status: "Closed"})}}>
                                      Mark as Closed
                                    </MenuItem>
                                    <MenuItem key={3} onClick={() => {this.handleVertMenuClose(); this.props.updateTicketStatus({ticket_id: ticket.id, status: "Completed"})}}>
                                      Mark as Resolved
                                    </MenuItem>
                                  </Menu>
                                </ListItemSecondaryAction>
                              </ItemGrid>
                            </Grid>
                          </ListItem>
                          : null
                      )
                    ) : this.props.assignedTickets.length ? <h4>No Tickets</h4> : <h4>You currently have no tickets assigned to you &#x263a;</h4> : null
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
    assignedTickets: state.tickets.assignedTickets
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: (modalType,modalProps = null) => { dispatch({ type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    updateTicketStatus: (params) => {dispatch(updateTicketStatus(params,updateTicketStatusSuccess,updateTicketStatusFailure)) },
    fetchAssignedTickets: () => { dispatch(fetchAssignedTickets(fetchAssignedTicketsSuccess,fetchAssignedTicketsFailure)) },
    createTicketComment: (params) => { dispatch(createTicketComment(params,createTicketCommentSuccess,createTicketCommentFailure)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AssignedTicketsTab));