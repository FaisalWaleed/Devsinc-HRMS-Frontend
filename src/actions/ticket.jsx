import * as types from "./actionTypes";

export const fetchTicketsSuccess = (payload) => ({
    type: types.FETCH_TICKETS_SUCCESS,
    payload: payload
});

export const fetchTicketsFailure = (payload) => ({
    type: types.FETCH_TICKETS_FAILURE,
    payload
});

export const createTicketSuccess = (payload) => ({
  type: types.CREATE_TICKET_SUCCESS,
  payload
});

export const createTicketFailure = (payload) => ({
  type: types.CREATE_TICKET_FAILURE,
  payload
});

