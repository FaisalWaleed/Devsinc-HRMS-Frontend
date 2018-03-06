import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    reduxTokenAuth:reduxTokenAuthReducer,
    form: formReducer,
});

export default rootReducer;