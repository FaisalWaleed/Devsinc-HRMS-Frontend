import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as formReducer } from 'redux-form';
import { department } from './department';

const rootReducer = combineReducers({
    departments: department,
    reduxTokenAuth:reduxTokenAuthReducer,
    form: formReducer,
});

export default rootReducer;