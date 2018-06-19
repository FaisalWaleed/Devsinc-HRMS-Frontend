import request from "./request";

export const fetchTickets = (successAction, failureAction) => {
  return request('tickets', {}, successAction, failureAction, true);
};

export const fetchAssignedTickets = (successAction, failureAction) => {
  return request('tickets/assigned', {}, successAction, failureAction, true);
};

export const createTicket = (params, successAction, failureAction) => {
  return request('tickets', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ticket: params})
  }, successAction, failureAction, true);
};


export const updateTicketStatus = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}`,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ticket: params})
  },successAction,failureAction, true);
};

export const fetchTicketOption = (params, successAction, failureAction) => {
  //passes department id in call
  return request(`tickets/ticket_option?id=${params.id}`,{},successAction,failureAction, true);
};

export const fetchTicketComments = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}/comments`, {},successAction,failureAction, true);
};

export const createTicketComment = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}/comments`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({comment: params})
  },successAction,failureAction, true);
};

export const fetchTicketStatuses = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}/statuses`,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },successAction,failureAction, true);
};

export const fetchSearchedTickets = (params, successAction, failureAction) => {
  let url = 'tickets/search?';
  Object.keys(params).forEach(key => url += `${key}=${params[key]}&`);
  return request(url,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },successAction, failureAction, true);
};
