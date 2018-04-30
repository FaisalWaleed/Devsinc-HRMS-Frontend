import request from "./request";

export const createLeave = (params, successAction, failureAction) => {
  return request('leaves', {
    method: 'POST',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({leave: params})
  }, successAction, failureAction);
};

export const fetchLeaves = (successAction, failureAction) => {
  return request('leaves',{
    method: 'GET',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },successAction,failureAction);
  
};