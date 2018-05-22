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
          attributes: {
              firstName: null,
          },
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
    allLeaves: [],
    allLeaveApprovals: [],
    allUserLeavesHistory: [],
    allLeavesLifecycle: [],
    leavesTableYear: (new Date()).getFullYear()
  },
  permissions: {
    userRoles: [],
    userPermissions: [],
    permissionsObj: {}
  },
  errors:{
    appError: false
  }
};

export default initialState;
