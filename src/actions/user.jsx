import * as types from "./actionTypes";
import {HIDE_MODAL} from "./modal";
import { fetchUsers } from "../api/user";
import {reset} from 'redux-form';
import {showNotification} from "./notification";
import {AddAlert} from "material-ui-icons/index";


export const fetchUsersSuccess = (payload) => ({
  type: types.FETCH_USERS_SUCCESS,
  payload: payload
});

export const fetchUsersFailure = (payload) => ({
  type: types.FETCH_USERS_FAILURE,
  payload
});

export const editUserSuccess = (payload) => ({
  type: types.EDIT_USER_SUCCESS,
  payload
});

export const editUserFailure = (payload) => {
  return dispatch => {
    dispatch({
      type: types.EDIT_USER_FAILURE,
      payload
    });
  };
};

export const deleteUserSuccess = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place: 'tc',
      color: 'success',
      icon: AddAlert,
      message: 'User has been deactivated!',
    }));
    dispatch({
      type: types.DELETE_USER_SUCCESS,
      payload
    })
  }
};

export const deleteUserFailure = (payload) => ({
  type: types.DELETE_USER_FAILURE,
  payload
});

export const getProfileSuccess = (payload) => ({
  type: "GET_PROFILE_SUCCESS",
  payload
});

export const getProfileFailure = (payload) => ({
  type: "GET_PROFILE_FAILURE",
  payload
});

export const updateProfileSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload
    });
    dispatch(showNotification({
      place: 'tc',
      color: 'success',
      icon: AddAlert,
      message: 'Successfully Updated Profile!',
    }));
  }
};

export const updateProfileFailure = (payload) => ({
  type: "UPDATE_PROFILE_FAILURE",
  payload
});

export const createUserSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.CREATE_USER_SUCCESS,
      payload
    });
    dispatch(fetchUsers(fetchUsersSuccess, fetchUsersFailure));
    dispatch(reset('user_form'));
    dispatch(HIDE_MODAL);
  }
};

export const createUserFailure = (payload) => {
  return {
    type: types.CREATE_USER_FAILURE,
    payload
  }
};

export const clearUserCreateForm = () => {
  return {
    type: types.CLEAR_CREATE_USER_FORM_ERRORS
  }
};

export const resetPasswordSuccess = (payload) => {
  return {
    type: types.RESET_PASSWORD_SUCCESS,
    payload
  }
};

export const resetPasswordFailure = (payload) => {
  return {
    type: types.RESET_PASSWORD_FAILURE,
    payload
  }
};

export const deactivateUserSuccess = (payload) => {
  return dispatch => {
    dispatch({
      type: types.DEACTIVATE_USER_SUCCESS,
      payload
    });
    dispatch(showNotification({
      place: 'tc',
      color: 'success',
      icon: AddAlert,
      message: 'User has been activated!',
    }));
  }
};

export const deactivateUserFailure = (payload) => {
  return {
    type: types.DEACTIVATE_USER_FAILURE,
    payload
  }
};
