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
    allUserProfiles: {},
    allUsers: [],
    userCreateFormErrors: null,
    resetPasswordSuccess: false
  },
  tickets: {
    tab: 0,
    createdTickets: [],
    assignedTickets: [],
    allTickets: [],
    ticketOptions: {},
    ticketComments: {},
    ticketStatuses: {}
  },
  leaves: {
    tab: 0,
    allLeavesSummary: [], //all user's leaves summary
    currentUserLeaves: [], // current user's leaves
    currentUserLeaveApprovals: [], // leaves current user can approve
    allUserLeavesSummary: [], // number of leaves by user for leave status form
    allLeavesLifecycle: [], // lifecycle of leaves
    allUsersLeavesHistory: [] // all leaves by all users
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
  },
  titles: {
    allTitles: []
  }
};

export default initialState;
