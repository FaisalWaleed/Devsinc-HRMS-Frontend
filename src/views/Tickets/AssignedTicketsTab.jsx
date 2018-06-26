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
                                alt="Adelle Charles"
                                src="data:image/png;base64,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"
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