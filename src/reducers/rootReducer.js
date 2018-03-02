import { combineReducers } from 'redux';
<<<<<<< c635fc9d11c641d9da2030b542026cd130978dc2
import { reduxTokenAuthReducer } from 'redux-token-auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    reduxTokenAuth:reduxTokenAuthReducer,
    form: formReducer,
=======
import reduxTokenAuthReducer from 'redux-token-auth';

const rootReducer = combineReducers({
    reduxTokenAuth: reduxTokenAuthReducer,
>>>>>>> Added Redux Structure and Redux-Token-Auth
});

export default rootReducer;