import initialState from "./initialState";
import * as types from '../actions/actionTypes';
import update from 'immutability-helper'

export const permission = (state=initialState.permissions, action) => {
  switch(action.type){
    case types.FETCH_PERMISSION_SUCCESS:
      localStorage.setItem("permissions",action.payload.permissions);
      localStorage.setItem("roles",action.payload.roles);
      return {...state, userPermissions: action.payload.permissions, userRoles: action.payload.roles };
    
    case types.FETCH_PERMISSIONS_OBJECT_SUCCESS:
      return {...state, permissionsObj: action.payload};
    
    case types.FETCH_PERMISSIONS_OBJECT_FAILURE:
      return state;
  
    case types.ALLOW_PERMISSION_TO_ROLE_SUCCESS:
      return update(state, { permissionsObj: { [action.payload.group]: { [action.payload.permission_id]: { allowed_for: {$push: [action.payload.role_id]}  } } }});
    case types.ALLOW_PERMISSION_TO_ROLE_FAILURE:
      return state;
    case types.REVOKE_PERMISSION_FROM_ROLE_SUCCESS:
      let index = state.permissionsObj[action.payload.group][action.payload.permission_id].allowed_for.indexOf(action.payload.role_id);
      return update(state, { permissionsObj: { [action.payload.group]: { [action.payload.permission_id]: { allowed_for: {$unset: [index] }  } } }});
    case types.REVOKE_PERMISSION_FROM_ROLE_FAILURE:
      return state;
    
    default:
      return state
  }
};