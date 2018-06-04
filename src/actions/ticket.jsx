import * as types from "./actionTypes";
import {fetchAssignedTickets, fetchTickets, fetchTicketStatuses} from "../api/ticket";
import {HIDE_MODAL} from "./modal";
import {showNotification} from "./notification";


export const setTab = (payload) => {
  return {
    type: types.SET_TICKETS_TAB,
    payload
  }
};

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
    dispatch(showNotification({
      place:'tc',
      color: 'success',
      message: "Successfully created new Ticket!"
    }));
    dispatch(fetchTickets(fetchTicketsSuccess,fetchTicketsFailure));
    dispatch(HIDE_MODAL);
  }
};

export const createTicketFailure = (payload) => {
  return dispatch => {
    dispatch({
      type: types.CREATE_TICKET_FAILURE,
      payload
    });
    dispatch(showNotification({
      place:'tc',
      color: 'danger',
      message: "Failed to create Ticket!"
    }));
  }
};

export const updateTicketStatusSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.UPDATE_TICKET_STATUS_SUCCESS,
      payload
    });
    dispatch(fetchTickets(fetchTicketsSuccess,fetchTicketsFailure));
    dispatch(fetchAssignedTickets(fetchAssignedTicketsSuccess,fetchAssignedTicketsFailure));
    dispatch(fetchTicketStatuses({ticket_id: payload.id},fetchTicketStatusesSuccess,fetchTicketStatusesFailure));
  }
};

export const updateTicketStatusFailure = (payload) => ({
  type: types.UPDATE_TICKET_STATUS_FAILURE,
  payload
});

export const fetchTicketOptionSuccess = (payload) => ({
  type: types.FETCH_TICKET_OPTION_SUCCESS,
  payload
});

export const fetchTicketOptionFailure = (payload) => ({
  type: types.FETCH_TICKET_OPTION_FAILURE,
  payload
});

export const fetchTicketCommentsSuccess = (payload) => ({
  type: types.FETCH_TICKET_COMMENTS_SUCCESS,
  payload
});

export const fetchTicketCommentsFailure = (payload) => ({
  type: types.FETCH_TICKET_COMMENTS_FAILURE,
  payload
});

export const createTicketCommentSuccess = (payload) => ({
  type: types.CREATE_TICKET_COMMENT_SUCCESS,
  payload
});

export const createTicketCommentFailure = (payload) => ({
  type: types.CREATE_TICKET_COMMENT_FAILURE,
  payload
});

export const fetchTicketStatusesSuccess = (payload) => ({
  type: types.FETCH_TICKET_STATUSES_SUCCESS,
  payload
});

export const fetchTicketStatusesFailure = (payload) => ({
  type: types.FETCH_TICKET_STATUSES_FAILURE,
  payload
});
