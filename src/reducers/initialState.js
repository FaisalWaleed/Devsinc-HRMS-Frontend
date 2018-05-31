import { AddAlert } from "material-ui-icons";

const initialState = {
  roles: {
    role: {}
  },
  departments: {
    departments: []
  },
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {},
    },
  },
  modals: {
    modalType: null,
    modalProps: {
      open: false
    }
  },
  users: {
    allUsers: [],
    userCreateFormErrors: null,
    resetPasswordSuccess: false
  },
  tickets: {
    ticketOptions: {},
    ticketComments: {},
    ticketStatuses: {}
  },
  leaves: {
    tab: 0,
    allLeaves: [],
    currentUserLeaves: [], // current user's leaves
    currentUserLeaveApprovals: [], // leaves current user can approve
    allUserLeavesHistory: [], // number of leaves by user for leave approval
    allLeavesLifecycle: [], // lifecycle of leaves
  },
  permissions: {
    userRoles: [],
    userPermissions: [],
    permissionsObj: {}
  },
  notification: {
    place: 'tc',
    color: 'info',
    icon: AddAlert,
    message: '',
    open: false,
  },
  errors:{
    appError: false
  },
  sidebar: {
    open: true
  }
};

export default initialState;
