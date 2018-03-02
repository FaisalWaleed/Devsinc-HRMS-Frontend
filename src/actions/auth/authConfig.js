import { generateAuthActions } from 'redux-token-auth';
import { AUTH_URL } from "../../config/authConfig";

const config = {
    authUrl: AUTH_URL,
    userAttributes: {
        firstName: 'first_name',
        imageUrl: 'image',
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