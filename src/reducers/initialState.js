const initialState = {
    departments: [],
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
    }
};

export default initialState;
