import * as types from './actionTypes';

export const showNotification = (payload) => {
  return dispatch => {
    dispatch({
      type: types.SHOW_NOTIFICATION,
      payload
    });
    
    setTimeout(() => {
      dispatch({ type: types.CLOSE_NOTIFICATION })
    }, 5000)
  }
};

export const closeNotification = () => {
  return {
    type: types.CLOSE_NOTIFICATION,
  }
};