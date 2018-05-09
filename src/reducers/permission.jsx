import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const permission = (state=initialState, action) => {
  switch(action.type){
    case types.FETCH_PERMISSION_SUCCESS:
      localStorage.setItem("permissions",action.payload);
      return {...state, permissions: action.payload};
    
    case types.PREV_LEAVE_YEAR:
      return state;
      
    default:
      return state
  }
};