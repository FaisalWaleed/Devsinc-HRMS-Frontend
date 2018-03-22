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

    default:
      return state;
  }
};
