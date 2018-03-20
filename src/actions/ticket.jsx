import * as types from "./actionTypes";
import {fetchTickets} from "../api/ticket";

export const fetchTicketsSuccess = (payload) => ({
    type: types.FETCH_TICKETS_SUCCESS,
    payload: payload
});

export const fetchTicketsFailure = (payload) => ({
    type: types.FETCH_TICKETS_FAILURE,
    payload
});

export const fetchAssignedTicketsSuccess = (payload) => ({
  type: types.FETCH_ASSIGNED_TICKETS_SUCCESS,
  payload: payload
});

export const fetchAssignedTicketsFailure = (payload) => ({
  type: types.FETCH_ASSIGNED_TICKETS_FAILURE,
  payload
});

export const createTicketSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.CREATE_TICKET_SUCCESS,
      payload
    });
    dispatch(fetchTickets(fetchTicketsSuccess,fetchTicketsFailure));
  }
};

export const createTicketFailure = (payload) => ({
  type: types.CREATE_TICKET_FAILURE,
  payload
});

export const updateTicketSuccess = (payload) => ({
  type: types.UPDATE_TICKET_SUCCESS,
  payload
});

export const updateTicketFailure = (payload) => ({
  type: types.UPDATE_TICKET_FAILURE,
  payload
});

