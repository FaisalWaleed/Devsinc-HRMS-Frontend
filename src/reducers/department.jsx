import initialState from "reducers/initialState";
import * as types from '../actions/actionTypes';

export const department =  (state = initialState, action) => {
  switch(action.type){
    case types.FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state, 
        departments: action.payload,
        department: null,
        departmentCreated: null
      };
    case types.DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter(dep => dep.id != action.payload.department.id)
      };
    case types.GET_DEPARTMENT_SUCCESS:
      return {
        ...state,
        department: action.payload
      };
    case types.UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departmentUpdated: true
      };
    case types.CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departmentCreated: true
      };
    case types.DELETE_DEPARTMENT_FAILURE:
      return state;
    default:
     return state
  }
}