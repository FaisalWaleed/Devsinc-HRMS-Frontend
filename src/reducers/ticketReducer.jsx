import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const ticketReducer = (state = initialState.tickets,action) => {
  switch(action.type) {
    case types.FETCH_TICKETS_SUCCESS:
      return {...state, createdTickets: action.payload };

    case types.FETCH_TICKETS_FAILURE:
      return state;

    case types.FETCH_ASSIGNED_TICKETS_SUCCESS:
      return {...state, assignedTickets: action.payload };

    case types.FETCH_ASSIGNED_TICKETS_FAILURE:
      return state;

    case types.CREATE_TICKET_SUCCESS:
      return state;

    case types.CREATE_TICKET_FAILURE:
      return state;

    case types.UPDATE_TICKET_STATUS_SUCCESS:
      return state;

    case types.UPDATE_TICKET_STATUS_FAILURE:
      return state;

    case types.FETCH_TICKET_OPTION_SUCCESS:
      return {...state, ticketOptions: {...state.ticketOptions, [action.payload.department_id]: action.payload}};

    case types.FETCH_TICKET_OPTION_FAILURE:
      return state;

    case types.FETCH_TICKET_COMMENTS_SUCCESS:
      if(action.payload[0]){
        return {...state, ticketComments: {...state.ticketComments, [action.payload[0].ticket_id]: action.payload}};
      }
      return state;

    case types.FETCH_TICKET_COMMENTS_FAILURE:
      return state;

    case types.CREATE_TICKET_COMMENT_SUCCESS:
      if(state.ticketComments[action.payload.ticket_id]){
        return {...state, ticketComments: {
            ...state.ticketComments, [action.payload.ticket_id]: [
              ...state.ticketComments[action.payload.ticket_id], action.payload
            ]
          }};
      }
      return {...state, ticketComments: {...state.ticketComments, [action.payload.ticket_id]: [action.payload]}};

    case types.CREATE_TICKET_COMMENT_FAILURE:
      return state;

    case types.FETCH_TICKET_STATUSES_SUCCESS:
      return {...state, ticketStatuses: {...state.ticketStatuses, [action.payload[0].ticket_id]: action.payload } };

    case types.FETCH_TICKET_STATUSES_FAILURE:
      return state;

    default:
      return state;
  }
};
