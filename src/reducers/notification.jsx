import initialState from "./initialState";
import * as types from '../actions/actionTypes';
import { AddAlert } from "material-ui-icons";

export const notification = (state=initialState.notification, action) => {
  switch(action.type){
    case types.SHOW_NOTIFICATION:
      return {
        place: action.payload.place ? action.payload.place : 'tc',
        color: action.payload.color ? action.payload.color : 'info',
        icon: action.payload.color ? action.payload.icon : AddAlert,
        message: action.payload.message ? action.payload.message : '',
        open: true,
      };
      
    case types.CLOSE_NOTIFICATION:
      return {
        place: 'tc',
        color: 'info',
        icon: AddAlert,
        message: '',
        open: false,
      };
      
    default:
      return state
  }
};