import * as types from './actionTypes';

export const fetchPermissionSuccess = (payload) => {
  return {
    type: types.FETCH_PERMISSION_SUCCESS,
    payload
  }
};

export const fetchPermissionFailure = (payload) => {
  return {
    type: types.FETCH_PERMISSION_FAILURE,
    payload
  }
};