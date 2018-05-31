import { TOGGLE_SIDEBAR } from "./actionTypes";

export const toggleSidebar = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    })
  }
};