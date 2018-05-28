import * as types from './actionTypes'
import {showNotification} from "./notification";

export const nextLeaveYear = {
  type: types.NEXT_LEAVE_YEAR
};

export const prevLeaveYear = {
  type: types.PREV_LEAVE_YEAR
};

export const createLeaveSuccess = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'success',
      message: "Applied for leave successfully!"
    }));
    dispatch({
      type: types.CREATE_LEAVE_SUCCESS,
      payload
    });
  }
};

export const createLeaveFailure = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'danger',
      message: "Failed to apply for leave!"
    }));
    dispatch({
      type: types.CREATE_LEAVE_FAILURE,
      payload
    });
  }
};

export const fetchLeavesSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LEAVES_SUCCESS,
      payload
    });
  }
};

export const fetchLeavesFailure = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LEAVES_FAILURE,
      payload
    });
  }
};

export const fetchLeaveApprovalsSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LEAVE_APPROVALS_SUCCESS,
      payload
    });
  }
};

export const fetchLeaveApprovalsFailure = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LEAVE_APPROVALS_FAILURE,
      payload
    });
  }
};

export const createLeaveStatusSuccess = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'success',
      message: "Successfully changed Leave Status!"
    }));
    dispatch({
      type: types.CREATE_LEAVE_STATUS_SUCCESS,
      payload
    });
  }
};

export const createLeaveStatusFailure = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'danger',
      message: "Failed to update Leave Status!"
    }));
    dispatch({
      type: types.CREATE_LEAVE_STATUS_FAILURE,
      payload
    });
  }
};

export const fetchUserLeavesHistorySuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_USER_LEAVES_HISTORY_SUCCESS,
      payload
    });
  }
};

export const fetchUserLeavesHistoryFailure = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_USER_LEAVES_HISTORY_FAILURE,
      payload
    });
  }
};

export const fetchLeaveLifeCycleSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LEAVE_LIFECYCLE_SUCCESS,
      payload
    })
  }
};

export const fetchLeaveLifeCycleFailure = (payload) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_LEAVE_LIFECYCLE_FAILURE,
      payload
    })
  }
};

export const fetchAllLeavesSuccess = (payload) => {
  return {
    type: types.FETCH_ALL_LEAVES_SUCCESS,
    payload
  }
};

export const fetchAllLeavesFailure = (payload) => {
  return {
    type: types.FETCH_ALL_LEAVES_FAILURE,
    payload
  }
};
