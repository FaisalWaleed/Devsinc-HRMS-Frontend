import initialState from "./initialState";
import * as types from '../actions/actionTypes';
import update from 'immutability-helper';

export const leave = (state=initialState.leaves, action) => {
  switch(action.type){
    case types.FETCH_LEAVES_SUCCESS:
      return {...state, currentUserLeaves: action.payload};
    
    case types.FETCH_LEAVES_FAILURE:
      return state;
    
    case types.FETCH_LEAVE_APPROVALS_SUCCESS:
      return {...state, currentUserLeaveApprovals: action.payload};
    
    case types.FETCH_LEAVE_APPROVALS_FAILURE:
      return state;
    
    case types.CREATE_LEAVE_SUCCESS:
      return {...state, currentUserLeaves: [...state.currentUserLeaves, action.payload ]};
    
    case types.CREATE_LEAVE_FAILURE:
      return state;
    
    case types.CREATE_LEAVE_STATUS_SUCCESS:
      let i = 0;
      for( i ; i < state.currentUserLeaveApprovals.length; i++){
        if(state.currentUserLeaveApprovals[i].id == action.payload.leave_id){
          break;
        }
      }
      return update(state,{
        currentUserLeaveApprovals: {
          [i] : {
            status: {$set: action.payload.status},
            comment: {$set: action.payload.comment}
          }
        }
      });
    
    case types.CREATE_LEAVE_STATUS_FAILURE:
      return state;
    
    case types.FETCH_USER_LEAVES_HISTORY_SUCCESS:
      return {
        ...state,
        allUserLeavesSummary: {...state.allUserLeavesSummary, [action.payload.user_id] : action.payload}
      };
    
    case types.FETCH_USER_LEAVES_HISTORY_FAILURE:
      return state;
    
    case types.FETCH_LEAVE_LIFECYCLE_SUCCESS:
      return {...state, allLeavesLifecycle: {...state.allLeavesLifecycle, [action.payload.leave_id] : action.payload.lifecycle } }
    
    case types.FETCH_LEAVE_LIFECYCLE_FAILURE:
      return state;
      
    case types.FETCH_ALL_LEAVES_SUMMARY_SUCCESS:
      return {...state, allLeavesSummary: action.payload};
      
    case types.FETCH_ALL_LEAVES_SUMMARY_FAILURE:
      return state;

    case types.SET_LEAVES_TAB:
      return {...state, tab: action.payload.tab};
    
    case types.FETCH_ALL_USERS_LEAVES_HISTORY_SUCCESS:
      return {...state, allUsersLeavesHistory: {...state.allUsersLeavesHistory, [action.payload[0].user_id] : action.payload } };
  
    case types.FETCH_ALL_USERS_LEAVES_HISTORY_FAILURE:
      return state;
      
    default:
      return state
  }
};