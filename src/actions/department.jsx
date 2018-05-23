import * as types from './actionTypes';
import {APP_ERROR_OCCURED} from "./error";
import {showNotification} from "./notification";

export const createDepartmentSuccess = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'success',
      message: "Successfully Created Department!"
    }));
    dispatch({
      type: types.CREATE_DEPARTMENT_SUCCESS,
      payload
    })
  };
};

export const createDepartmentFailure = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'danger',
      message: "Failed to Create Department!"
    }));
    dispatch({
      type: types.CREATE_DEPARTMENT_FAILURE,
      payload
    });
  };
};

export const fetchDepartmentsSuccess = (payload) => ({
  type: types.FETCH_DEPARTMENT_SUCCESS,
  payload
});

export const fetchDepartmentsFailure = (payload) => ({
  type: types.FETCH_DEPARTMENT_FAILURE,
  payload
});

export const deleteDepartmentSuccess = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'success',
      message: "Successfully Deleted Department!"
    }));
    dispatch({
      type: types.DELETE_DEPARTMENT_SUCCESS,
      payload
    })
  }
};

export const deleteDepartmentFailure = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'danger',
      message: "Failed to Delete Department!"
    }));
    dispatch({
      type: types.DELETE_DEPARTMENT_FAILURE,
      payload
    })
  };
  
};

export const getDepartmentSuccess = (payload) => ({
  type: types.GET_DEPARTMENT_SUCCESS,
  payload
});

export const getDepartmentFailure = (payload) => ({
  type: types.GET_DEPARTMENT_FAILURE,
  payload
});

export const updateDepartmentSuccess = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'success',
      message: "Successfully Updated Department!"
    }));
    dispatch({
      type: types.UPDATE_DEPARTMENT_SUCCESS,
      payload
    })
  };
};

export const updateDepartmentFailure = (payload) => {
  return dispatch => {
    dispatch(showNotification({
      place:'tc',
      color: 'danger',
      message: "Failed to Update Department!"
    }));
    dispatch({
      type: types.UPDATE_DEPARTMENT_FAILURE,
      payload
    })
  }
};
