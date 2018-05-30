import { TOGGLE_SIDEBAR, TOGGLE_MIN } from "./actionTypes";

export const toggleSidebar = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({type: TOGGLE_MIN})
    },180);
    dispatch({
      type: TOGGLE_SIDEBAR,
    })
  }
};