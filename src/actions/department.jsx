import * as types from './actionTypes';
import {APP_ERROR_OCCURED} from "./error";

export const createDepartmentSuccess = (payload) => ({
  type: "CREATE_DEPARTMENT_SUCCESS",
  payload
});

export const createDepartmentFailure = (payload) => ({
  type: "CREATE_DEPARTMENT_FAILURE",
  payload
});

export const fetchDepartmentsSuccess = (payload) => ({
  type: "FETCH_DEPARTMENTS_SUCCESS",
  payload
});

export const fetchDepartmentsFailure = (payload) => ({
  type: "FETCH_DEPARTMENTS_FAILURE",
  payload
});

export const deleteDepartmentSuccess = (payload) => ({
  type: "DELETE_DEPARTMENT_SUCCESS",
  payload
});

export const deleteDepartmentFailure = (payload) => {
  return dispatch => {
    dispatch(APP_ERROR_OCCURED);
    dispatch({
      type: "DELETE_DEPARTMENT_FAILURE",
      payload
    })
  };

};

export const getDepartmentSuccess = (payload) => ({
  type: "GET_DEPARTMENT_SUCCESS",
  payload
});

export const getDepartmentFailure = (payload) => ({
  type: "GET_DEPARTMENT_FAILURE",
  payload
});

export const updateDepartmentSuccess = (payload) => ({
  type: "UPDATE_DEPARTMENT_SUCCESS",
  payload
});

export const updateDepartmentFailure = (payload) => ({
  type: "UPDATE_DEPARTMENT_FAILURE",
  payload
});
