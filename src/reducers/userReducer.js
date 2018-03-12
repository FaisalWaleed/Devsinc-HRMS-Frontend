import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const userReducer = (state = initialState.users,action) => {
    switch(action.type) {
        case types.FETCH_USERS_SUCCESS:
            return action.payload;

        case types.FETCH_USERS_FAILURE:
            return state;

        case types.DELETE_USER_SUCCESS:
            return state.slice().filter( user => (parseInt(user.id,10) !== parseInt(action.payload.userId,10)));

        case types.DELETE_USER_FAILURE:
            return state;

        case types.EDIT_USER_SUCCESS:
            let newstate = state.slice();
            newstate.forEach( (user,index) => {
            if(parseInt(user.id,10) === parseInt(action.payload.id,10)){
                newstate[index].id = user.id;
                newstate[index] = action.payload;
            }});
            return newstate;

        case types.EDIT_USER_FAILURE:
            return state;

        default:
            return state;
    }
};
