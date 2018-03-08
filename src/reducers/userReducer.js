import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const userReducer = (state = initialState.users,action) => {
    switch(action.type) {
        case types.LOAD_USERS_SUCCESS:
            return action.payload;
        case types.DELETE_USER_SUCCESS:
            console.log(action.payload);
            return state;
        default:
            return state;
    }
};