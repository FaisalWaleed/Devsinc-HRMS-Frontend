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
}
export default initialState
