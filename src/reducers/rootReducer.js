import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as formReducer } from 'redux-form';
import { department } from './department';
import { userReducer } from './userReducer';
import { modalReducer } from "./modalReducer";
import { ticketReducer } from "./ticketReducer";
import { role } from './role';
import { leave } from "./leave";

const rootReducer = combineReducers({
  departments: department,
  reduxTokenAuth:reduxTokenAuthReducer,
  form: formReducer,
  users: userReducer,
  modals: modalReducer,
  tickets: ticketReducer,
  roles: role,
  leaves: leave
});

export default rootReducer;
