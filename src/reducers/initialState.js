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
    users: []
};

export default initialState;
