import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as formReducer } from 'redux-form';
import { department } from './department';
import { user } from './user';
import { modalReducer } from "./modalReducer";
import { ticket } from "./ticket";
import { role } from './role';
import { leave } from "./leave";
import { permission } from "./permission";
import { error } from "./error";
import { notification } from "./notification";
import { sidebar } from "./sidebar";
import { title } from "./title";

const rootReducer = combineReducers({
  departments: department,
  reduxTokenAuth:reduxTokenAuthReducer,
  form: formReducer,
  users: user,
  modals: modalReducer,
  tickets: ticket,
  roles: role,
  leaves: leave,
  permissions: permission,
  errors: error,
  notification: notification,
  sidebar: sidebar,
  titles: title
});

export default rootReducer;
