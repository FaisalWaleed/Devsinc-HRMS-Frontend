import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const role =  (state = initialState, action) => {
  switch(action.type){
    case "FETCH_ROLES_SUCCESS":
      console.log("in fetch roles success", action.payload);
      return {
        ...state, 
        roles: action.payload,
        role: null,
        roleCreated: null
      };
    case "DELETE_ROLE_SUCCESS":
      console.log("this is my state in delete role", action.payload);
      return {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload.id)
      };
    case "GET_ROLE_SUCCESS":
      return {
        ...state,
        role: action.payload
      };
    case "UPDATE_ROLE_SUCCESS":
      return {
        ...state,
        roleUpdated: true
      };
    case "CREATE_ROLE_SUCCESS":
      return {
        ...state,
        roleCreated: true
      };
    case "FETCH_USERS_FOR_ROLE_SUCCESS":
      return{
        ...state,
        usersForRole: action.payload
      };
    case "ADD_USERS_TO_ROLE_SUCCESS":
      return {
        ...state,
        role: action.payload
      };
    case "REMOVE_USERS_FROM_ROLE_SUCCESS":
      return {
        ...state,
        role: action.payload
      };
    case types.ALLOW_PERMISSION_TO_ROLE_SUCCESS:
      return state;
    case types.ALLOW_PERMISSION_TO_ROLE_FAILURE:
      return state;
    case types.REVOKE_PERMISSION_FROM_ROLE_SUCCESS:
      return state;
    case types.REVOKE_PERMISSION_FROM_ROLE_FAILURE:
      return state;
    default:
     return state
  }
}