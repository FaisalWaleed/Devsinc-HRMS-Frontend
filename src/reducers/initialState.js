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
  },
  tickets: {
    ticketOptions: {},
    ticketComments: {},
    ticketStatuses: {}
  },
  leaves: {
    leavesTableYear: (new Date()).getFullYear()
  }
};

export default initialState;
