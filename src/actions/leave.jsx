import * as types from './actionTypes'

export const nextLeaveYear = {
  type: types.NEXT_LEAVE_YEAR
};

export const prevLeaveYear = {
  type: types.PREV_LEAVE_YEAR
};

export const createLeaveSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.CREATE_LEAVE_SUCCESS,
      payload
    });
  }
};

export const createLeaveFailure = (payload) => {
  return dispatch => {
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