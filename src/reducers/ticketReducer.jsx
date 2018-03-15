import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const ticketReducer = (state = initialState,action) => {
    switch(action.type) {
        case types.FETCH_TICKETS_SUCCESS:
            return { allTickets: action.payload };

        case types.FETCH_USERS_FAILURE:
            return state;
        default:
            return state;
    }
};
