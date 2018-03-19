import request from "./request";

export const fetchTickets = (successAction, failureAction) => {
  return request('tickets', {}, successAction, failureAction);
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
