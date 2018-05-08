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

export const fetchLeaveApprovals = (successAction, failureAction) => {
  return request('leaves/leave_approvals',{
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

export const createLeaveStatus = (params,successAction,failureAction) => {
  return request('leave_statuses',{
    method: 'POST',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({leave_status: params})
  },successAction,failureAction);
};

export const fetchUserLeavesHistory = (params,successAction,failureAction) => {
  return request(`leaves/user_leaves_history?user_id=${params.user_id}`,{
    method: 'GET',
    headers: {
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },successAction,failureAction);
};

export const fetchLeaveLifeCycle = (params,successAction,failureAction) => {
  return request(`leave_statuses?leave_id=${params.leave_id}`, {
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
