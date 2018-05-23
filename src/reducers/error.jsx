import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const error = (state = initialState.errors,action) => {
  switch(action.type) {
    case types.APP_ERROR_OCCURED:
      return {...state, appError: true}
    default:
      return state;
  }
};

