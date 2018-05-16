import { generateAuthActions } from 'redux-token-auth';
import { AUTH_URL } from "../../config/apiConfig";

const config = {
  authUrl: AUTH_URL,
  userAttributes: {
    //    Add additional parameters here other than email and password
    //    FrontendName: BackendAttributeName
    id: 'id',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    role_id: 'role_id',
    reporting_to: 'reporting_to',
    buddy_id: 'buddy_id',
    join_date: 'join_date',
    permanent_address: 'permanent_address',
    emergency_contact_person_number: 'emergency_contact_person_number',
    password: 'password',
    username: 'username',
    company_id: 'company_id',
    department_id: 'department_id',
    employment_history: 'employment_history',
    email_schedule: 'email_schedule',
  },
  userRegistrationAttributes: {
    //    Add REQUIRED parameters here (other than email and password)
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    role_id: 'role_id',
    reporting_to: 'reporting_to',
    buddy_id: 'buddy_id',
    join_date: 'join_date',
    permanent_address: 'permanent_address',
    emergency_contact_person_number: 'emergency_contact_person_number',
    password: 'password',
    username: 'username',
    company_id: 'company_id',
    department_id: 'department_id',
    employment_history: 'employment_history',
    email_schedule: 'email_schedule',
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