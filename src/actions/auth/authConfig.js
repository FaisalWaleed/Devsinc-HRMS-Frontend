import { generateAuthActions } from 'redux-token-auth';
import { AUTH_URL } from "../../config/authConfig";

const config = {
    authUrl: AUTH_URL,
    userAttributes: {
    //    Add additional parameters here
    //    FrontendName: BackendAttributeName
    },
    userRegistrationAttributes: {
    //    Add REQUIRED parameters here (other than email and password)
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