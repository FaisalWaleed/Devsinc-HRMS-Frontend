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
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ticket: params})
  }, successAction, failureAction);
};


export const updateTicketStatus = (params, successAction, failureAction) => {
  return request(`tickets/${params.id}`,{
    method: 'PUT',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ticket: params})
  },successAction,failureAction);
};

export const fetchTicketOption = (params, successAction, failureAction) => {
  return request(`tickets/ticket_option?id=${params.id}`,{
    method: 'GET',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
    }
  },successAction,failureAction);
};

export const fetchTicketComments = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}/comments`, {
    method: 'GET',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token')
    }
  },successAction,failureAction);
};

export const createTicketComment = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}/comments`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'client' : localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token')
    },
    body: JSON.stringify({comment: params})
  },successAction,failureAction);
};


export const fetchTicketStatuses = (params, successAction, failureAction) => {
  return request(`tickets/${params.ticket_id}/statuses`,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'client' : localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token')
    }
  },successAction,failureAction);
};
