import initialState from "reducers/initialState";
// import { FETCH_DEPARTMENTS } from "actions/actionTypes";

export const department =  (state = initialState, action) => {
  switch(action.type){
    case "FETCH_DEPARTMENTS_SUCCESS":
      return {
        ...state, 
        departments: action.payload
      };

    default:
     return state
  }
}