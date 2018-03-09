import * as types from "./actionTypes";

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