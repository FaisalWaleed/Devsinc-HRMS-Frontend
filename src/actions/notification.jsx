import * as types from './actionTypes';

export const showNotification = (payload) => {
  //dispatch close after 5 seconds here
  return {
    type: types.SHOW_NOTIFICATION,
    payload
  }
};

export const closeNotification = () => {
  return {
    type: types.CLOSE_NOTIFICATION,
  }
};