// import { FETCH_DEPARTMENTS } from "actions/actionTypes";

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