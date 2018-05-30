import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const role =  (state = initialState, action) => {
  switch(action.type){
    case types.FETCH_ROLES_SUCCESS:
      return {
        ...state, 
        roles: action.payload,
        role: null,
        roleCreated: null
      };
    case types.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload.id)
      };
    case types.GET_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload
      };
    case types.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        roleUpdated: true
      };
    case types.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        roleCreated: true
      };
    case types.FETCH_USERS_FOR_ROLE_SUCCESS:
      return{
        ...state,
        usersForRole: action.payload
      };
    case types.ADD_USERS_TO_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload
      };
    case types.REMOVE_USERS_FROM_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload
      };
    default:
     return state
  }
};