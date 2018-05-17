import * as types from "./actionTypes";
import {HIDE_MODAL} from "./modal";
import { fetchUsers } from "../api/user";
import {reset} from 'redux-form';


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

export const editUserFailure = (payload) => ({
  type: types.EDIT_USER_FAILURE,
  payload
});

export const deleteUserSuccess = (payload) => ({
  type: types.DELETE_USER_SUCCESS,
  payload
});

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

export const updateProfileSuccess = (payload) => ({
  type: "UPDATE_PROFILE_SUCCESS",
  payload
});

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