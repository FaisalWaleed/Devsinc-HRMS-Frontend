// import { FETCH_ROLES } from "actions/actionTypes";

export const createRoleSuccess = (payload) => ({
  type: "CREATE_ROLE_SUCCESS",
  payload
});

export const createRoleFailure = (payload) => ({
  type: "CREATE_ROLE_FAILURE",
  payload
});

export const fetchRolesSuccess = (payload) => ({
  type: "FETCH_ROLES_SUCCESS",
  payload
});

export const fetchRolesFailure = (payload) => ({
  type: "FETCH_ROLES_FAILURE",
  payload
});

export const deleteRoleSuccess = (payload) => ({
  type: "DELETE_ROLE_SUCCESS",
  payload
});

export const deleteRoleFailure = (payload) => ({
  type: "DELETE_ROLE_FAILURE",
  payload
});

export const getRoleSuccess = (payload) => ({
  type: "GET_ROLE_SUCCESS",
  payload
});

export const getRoleFailure = (payload) => ({
  type: "GET_ROLE_FAILURE",
  payload
});

export const updateRoleSuccess = (payload) => ({
  type: "UPDATE_ROLE_SUCCESS",
  payload
});

export const updateRoleFailure = (payload) => ({
  type: "UPDATE_ROLE_FAILURE",
  payload
});
