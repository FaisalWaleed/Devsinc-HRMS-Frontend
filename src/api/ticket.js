import request from "./request";

export const fetchTickets = (successAction, failureAction) => {
  return request('tickets', {
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token')
    }
  }, successAction, failureAction);
};

export const fetchAssignedTickets = (successAction, failureAction) => {
  return request('tickets/assigned', {
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token')
    }
  }, successAction, failureAction);
};

export const createTicket = (params, successAction, failureAction) => {
  return request('tickets', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ticket: params})
  }, successAction, failureAction);
};


export const updateTicket = (params, successAction, failureAction) => {
  return request(`tickets/${params.id}`,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  },successAction,failureAction);
};
