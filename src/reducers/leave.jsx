import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const leave = (state=initialState.leaves, action) => {
  switch(action.type){
    case types.NEXT_LEAVE_YEAR:
      return {...state, leavesTableYear: parseInt(state.leavesTableYear+1) };
    case types.PREV_LEAVE_YEAR:
      //  decrement year
      return {...state, leavesTableYear: parseInt(state.leavesTableYear-1) };
    default:
      return state
  }
};