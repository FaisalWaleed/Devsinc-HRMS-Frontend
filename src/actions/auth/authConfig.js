import { generateAuthActions } from 'redux-token-auth';
import { AUTH_URL } from "../../config/apiConfig";

const config = {
    authUrl: AUTH_URL,
    userAttributes: {
    //    Add additional parameters here
    //    FrontendName: BackendAttributeName
    },
    userRegistrationAttributes: {
    },
};

const {
    registerUser,
    signInUser,
    signOutUser,
    verifyCredentials,
} = generateAuthActions(config);

export {
    registerUser,
    signInUser,
    signOutUser,
    verifyCredentials,
}