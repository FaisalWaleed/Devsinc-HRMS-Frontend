// export const ACTION_NAME = 'ACTION_NAME';

//User Action Types
export const FETCH_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CLEAR_CREATE_USER_FORM_ERRORS = 'CLEAR_CREATE_USER_FORM_ERRORS';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const DEACTIVATE_USER_SUCCESS = 'DEACTIVATE_USER_SUCCESS';
export const DEACTIVATE_USER_FAILURE = 'DEACTIVATE_USER_FAILURE';
export const ACTIVATE_USER_SUCCESS = 'ACTIVATE_USER_SUCCESS';
export const ACTIVATE_USER_FAILURE = 'ACTIVATE_USER_FAILURE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';


//Modal Action Types
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

//Modal Types
export const DELETE_MODAL = 'DELETE_MODAL';
export const FORM_MODAL = 'FORM_MODAL';
export const CONTENT_MODAL = 'CONTENT_MODAL';

//Ticket Action Types
export const SET_TICKETS_TAB = 'SET_TICKETS_TAB';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const FETCH_ASSIGNED_TICKETS_SUCCESS = 'FETCH_ASSIGNED_TICKETS_SUCCESS';
export const FETCH_ASSIGNED_TICKETS_FAILURE = 'FETCH_ASSIGNED_TICKETS_FAILURE';
export const CREATE_TICKET_SUCCESS = 'CREATE_TICKET_SUCCESS';
export const CREATE_TICKET_FAILURE = 'CREATE_TICKET_FAILURE';
export const UPDATE_TICKET_STATUS_SUCCESS = 'UPDATE_TICKET_STATUS_SUCCESS';
export const UPDATE_TICKET_STATUS_FAILURE = 'UPDATE_TICKET_STATUS_FAILURE';
export const FETCH_TICKET_OPTION_SUCCESS = 'FETCH_TICKET_OPTION_SUCCESS';
export const FETCH_TICKET_OPTION_FAILURE = 'FETCH_TICKET_OPTION_FAILURE';
export const FETCH_TICKET_COMMENTS_SUCCESS = 'FETCH_TICKET_COMMENTS_SUCCESS';
export const FETCH_TICKET_COMMENTS_FAILURE = 'FETCH_TICKET_COMMENTS_FAILURE';
export const CREATE_TICKET_COMMENT_SUCCESS = 'CREATE_TICKET_COMMENT_SUCCESS';
export const CREATE_TICKET_COMMENT_FAILURE = 'CREATE_TICKET_COMMENT_FAILURE';
export const FETCH_TICKET_STATUSES_SUCCESS = 'FETCH_TICKET_STATUSES_SUCCESS';
export const FETCH_TICKET_STATUSES_FAILURE = 'FETCH_TICKET_STATUSES_FAILURE';

//Leave Action Types
export const SET_LEAVES_TAB = 'SET_LEAVES_TAB';
export const CREATE_LEAVE_SUCCESS = 'CREATE_LEAVE_SUCCESS';
export const CREATE_LEAVE_FAILURE = 'CREATE_LEAVE_FAILURE';
export const FETCH_LEAVES_SUCCESS = 'FETCH_LEAVES_SUCCESS';
export const FETCH_LEAVES_FAILURE = 'FETCH_LEAVES_FAILURE';
export const FETCH_LEAVE_APPROVALS_SUCCESS = 'FETCH_LEAVE_APPROVALS_SUCCESS';
export const FETCH_LEAVE_APPROVALS_FAILURE = 'FETCH_LEAVE_APPROVALS_FAILURE';
export const CREATE_LEAVE_STATUS_SUCCESS = 'CREATE_LEAVE_STATUS_SUCCESS';
export const CREATE_LEAVE_STATUS_FAILURE = 'CREATE_LEAVE_STATUS_FAILURE';
export const FETCH_USER_LEAVES_HISTORY_SUCCESS = 'FETCH_USER_LEAVES_HISTORY_SUCCESS';
export const FETCH_USER_LEAVES_HISTORY_FAILURE = 'FETCH_USER_LEAVES_HISTORY_FAILURE';
export const FETCH_LEAVE_LIFECYCLE_SUCCESS = 'FETCH_LEAVE_LIFECYCLE_SUCCESS';
export const FETCH_LEAVE_LIFECYCLE_FAILURE = 'FETCH_LEAVE_LIFECYCLE_FAILURE';
export const FETCH_ALL_LEAVES_SUCCESS = 'FETCH_ALL_LEAVES_SUCCESS'
export const FETCH_ALL_LEAVES_FAILURE = 'FETCH_ALL_LEAVES_FAILURE'

//Permission Action Types
export const FETCH_PERMISSION_SUCCESS = 'FETCH_PERMISSION_SUCCESS';
export const FETCH_PERMISSION_FAILURE = 'FETCH_PERMISSION_FAILURE';
export const FETCH_PERMISSIONS_OBJECT_SUCCESS = 'FETCH_PERMISSION_OBJECT_SUCCESS';
export const FETCH_PERMISSIONS_OBJECT_FAILURE = 'FETCH_PERMISSION_OBJECT_FAILURE';

//Role Action Types
export const ALLOW_PERMISSION_TO_ROLE_SUCCESS = 'ALLOW_PERMISSION_TO_ROLE_SUCCESS';
export const ALLOW_PERMISSION_TO_ROLE_FAILURE = 'ALLOW_PERMISSION_TO_ROLE_FAILURE';
export const REVOKE_PERMISSION_FROM_ROLE_SUCCESS = 'REVOKE_PERMISSION_FROM_ROLE_SUCCESS';
export const REVOKE_PERMISSION_FROM_ROLE_FAILURE = 'REVOKE_PERMISSION_FROM_ROLE_FAILURE';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAILURE = 'CREATE_ROLE_FAILURE';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAILURE = 'FETCH_ROLES_FAILURE';
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAILURE = 'DELETE_ROLE_FAILURE';
export const GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS';
export const GET_ROLE_FAILURE = 'GET_ROLE_FAILURE';
export const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
export const UPDATE_ROLE_FAILURE = 'UPDATE_ROLE_FAILURE';
export const FETCH_USERS_FOR_ROLE_SUCCESS = 'FETCH_USERS_FOR_ROLE_SUCCESS';
export const FETCH_USERS_FOR_ROLE_FAILURE = 'FETCH_USERS_FOR_ROLE_FAILURE';
export const ADD_USERS_TO_ROLE_SUCCESS = 'ADD_USERS_TO_ROLE_SUCCESS';
export const ADD_USERS_TO_ROLE_FAILURE = 'ADD_USERS_TO_ROLE_FAILURE';
export const REMOVE_USERS_FROM_ROLE_SUCCESS = 'REMOVE_USERS_FROM_ROLE_SUCCESS';
export const REMOVE_USERS_FROM_ROLE_FAILURE = 'REMOVE_USERS_FROM_ROLE_FAILURE';

//Error Action Types
export const APP_ERROR_OCCURED = 'APP_ERROR_OCCURED';

//Notification Action Types
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

//Department Action Types
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS';
export const CREATE_DEPARTMENT_FAILURE = 'CREATE_DEPARTMENT_FAILURE';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE';
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS';
export const DELETE_DEPARTMENT_FAILURE = 'DELETE_DEPARTMENT_FAILURE';
export const GET_DEPARTMENT_SUCCESS = 'GET_DEPARTMENT_SUCCESS';
export const GET_DEPARTMENT_FAILURE = 'GET_DEPARTMENT_FAILURE';
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS';
export const UPDATE_DEPARTMENT_FAILURE = 'UPDATE_DEPARTMENT_FAILURE';
