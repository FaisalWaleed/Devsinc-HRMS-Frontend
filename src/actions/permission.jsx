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

export const fetchPermissionsObjectSuccess = (payload) => {
  return {
    type: types.FETCH_PERMISSIONS_OBJECT_SUCCESS,
    payload
  }
};

export const fetchPermissionsObjectFailure = (payload) => {
  return {
    type: types.FETCH_PERMISSIONS_OBJECT_FAILURE,
    payload
  }
};