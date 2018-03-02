import { combineReducers } from 'redux';
import reduxTokenAuthReducer from 'redux-token-auth';

const rootReducer = combineReducers({
    reduxTokenAuth: reduxTokenAuthReducer,
});

export default rootReducer;