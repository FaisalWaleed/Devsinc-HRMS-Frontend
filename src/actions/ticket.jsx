import * as types from "./actionTypes";

export const fetchTicketsSuccess = (payload) => ({
    type: types.FETCH_TICKETS_SUCCESS,
    payload: payload
});

export const fetchTicketsFailure = (payload) => ({
    type: types.FETCH_TICKETS_FAILURE,
    payload
});


