import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const permission = (state=initialState.permissions, action) => {
  switch(action.type){
    case types.FETCH_PERMISSION_SUCCESS:
      localStorage.setItem("permissions",action.payload);
      return {...state, userPermissions: action.payload};
    
    case types.PREV_LEAVE_YEAR:
      return state;
    
    case types.FETCH_PERMISSIONS_OBJECT_SUCCESS:
      return {...state, permissionsObj: action.payload};
    
    case types.FETCH_PERMISSIONS_OBJECT_FAILURE:
      return state;
    
    default:
      return state
  }
};