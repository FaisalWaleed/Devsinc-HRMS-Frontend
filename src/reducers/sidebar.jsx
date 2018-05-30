import initialState from "./initialState";
import {TOGGLE_MIN, TOGGLE_SIDEBAR} from "../actions/actionTypes";

export const sidebar =  (state = initialState.sidebar, action) => {
  switch(action.type){
    case TOGGLE_SIDEBAR:
      return {...state, open: !state.open};
    case TOGGLE_MIN:
      return {...state, min: !state.min};
    default:
      return state
  }
};