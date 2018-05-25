import * as types from "./actionTypes";

export const createRoleSuccess = (payload) => ({
  type: types.CREATE_ROLE_SUCCESS,
  payload
});

export const createRoleFailure = (payload) => ({
  type: types.CREATE_ROLE_FAILURE,
  payload
});

export const fetchRolesSuccess = (payload) => ({
  type: types.FETCH_ROLES_SUCCESS,
  payload
});

export const fetchRolesFailure = (payload) => ({
  type: types.FETCH_ROLES_FAILURE,
  payload
});

export const deleteRoleSuccess = (payload) => ({
  type: types.DELETE_ROLE_SUCCESS,
  payload
});

export const deleteRoleFailure = (payload) => ({
  type: types.DELETE_ROLE_FAILURE,
  payload
});

export const getRoleSuccess = (payload) => ({
  type: types.GET_ROLE_SUCCESS,
  payload
});

export const getRoleFailure = (payload) => ({
  type: types.GET_ROLE_FAILURE,
  payload
});

export const updateRoleSuccess = (payload) => ({
  type: types.UPDATE_ROLE_SUCCESS,
  payload
});

export const updateRoleFailure = (payload) => ({
  type: types.UPDATE_ROLE_FAILURE,
  payload
});

export const fetchUsersForRoleSuccess = (payload) => ({
  type: types.FETCH_USERS_FOR_ROLE_SUCCESS,
  payload
});

export const fetchUsersForRoleFailure = (payload) => ({
  type: types.FETCH_USERS_FOR_ROLE_FAILURE,
  payload
});

export const addUsersToRoleSuccess = (payload) => ({
  type: types.ADD_USERS_TO_ROLE_SUCCESS,
  payload
});

export const addUsersToRoleFailure = (payload) => ({
  type: types.ADD_USERS_TO_ROLE_FAILURE,
  payload
});

export const removeUserFromRoleSuccess = (payload) => ({
  type: types.REMOVE_USERS_FROM_ROLE_SUCCESS,
  payload
});

export const removeUserFromRoleFailure = (payload) => ({
  type: types.REMOVE_USERS_FROM_ROLE_FAILURE,
  payload
});

export const allowPermissionToRoleSuccess = (payload) => ({
  type: types.ALLOW_PERMISSION_TO_ROLE_SUCCESS,
  payload
});

export const allowPermissionToRoleFailure = (payload) => ({
  type: types.ALLOW_PERMISSION_TO_ROLE_FAILURE,
  payload
});

export const revokePermissionFromRoleSuccess = (payload) => ({
  type: types.REVOKE_PERMISSION_FROM_ROLE_SUCCESS,
  payload
});

export const revokePermissionFromRoleFailure = (payload) => ({
  type: types.REVOKE_PERMISSION_FROM_ROLE_FAILURE,
  payload
});
