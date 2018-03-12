import initialState from "reducers/initialState";
// import { FETCH_DEPARTMENTS } from "actions/actionTypes";

export const department =  (state = initialState, action) => {
  switch(action.type){
    case "FETCH_DEPARTMENTS_SUCCESS":
      return {
        ...state, 
        departments: action.payload,
        department: null,
        departmentCreated: null
      };
    case "DELETE_DEPARTMENT_SUCCESS":
      return {
        ...state,
        departments: state.departments.filter(dep => dep.id != action.payload.department.id)
      }
    case "GET_DEPARTMENT_SUCCESS":
      return {
        ...state,
        department: action.payload
      }
    case "UPDATE_DEPARTMENT_SUCCESS":
      return {
        ...state,
        departmentUpdated: true
      }
    case "CREATE_DEPARTMENT_SUCCESS":
      return {
        ...state,
        departmentCreated: true
      }
    default:
     return state
  }
}