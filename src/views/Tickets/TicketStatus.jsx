import React from 'react';
import { connect } from 'react-redux';
import {fetchTicketStatuses} from "../../api/ticket";
import {fetchTicketStatusesFailure, fetchTicketStatusesSuccess} from "../../actions/ticket";

class TicketStatus extends React.Component{

  componentDidMount(){
    this.props.fetchTicketStatuses({ticket_id: this.props.ticket_id});
  }

  render(){
    console.log(this.props.ticketStatuses);
    return(
      <div>
        {this.props.ticketStatuses ? this.props.ticketStatuses.map((status) => {
          return <span>{status.status}</span>
        }) : null}
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    ticketStatuses: state.tickets.ticketStatuses[ownProps.ticket_id]
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchTicketStatuses: (params) => { dispatch(fetchTicketStatuses(params,fetchTicketStatusesSuccess,fetchTicketStatusesFailure)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TicketStatus);