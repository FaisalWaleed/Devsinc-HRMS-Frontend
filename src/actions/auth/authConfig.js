import { generateAuthActions } from 'redux-token-auth';
import { AUTH_URL } from "../../config/apiConfig";

const config = {
    authUrl: AUTH_URL,
    userAttributes: {
    //    Add additional parameters here other than email and password
    //    FrontendName: BackendAttributeName
    //     username: 'username',
    //     name: 'name',
    //     company_id: 'company_id',
    //     department_id: 'department_id'
    },
    userRegistrationAttributes: {
    //    Add REQUIRED parameters here (other than email and password)
    //     company_id: 'company_id'
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