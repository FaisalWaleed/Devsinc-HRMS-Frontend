import initialState from "reducers/initialState";
// import { FETCH_ROLES } from "actions/actionTypes";

export const role =  (state = initialState, action) => {
  switch(action.type){
    case "FETCH_ROLES_SUCCESS":
      console.log("in fetch roles success", action.payload);
      return {
        ...state, 
        roles: action.payload,
        role: null,
        roleCreated: null
      };
    case "DELETE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.filter(role => role.id != action.payload.role.id)
      }
    case "GET_ROLE_SUCCESS":
      return {
        ...state,
        role: action.payload
      }
    case "UPDATE_ROLE_SUCCESS":
      return {
        ...state,
        roleUpdated: true
      }
    case "CREATE_ROLE_SUCCESS":
      return {
        ...state,
        roleCreated: true
      }
    default:
     return state
  }
}