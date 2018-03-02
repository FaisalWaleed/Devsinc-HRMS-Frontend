import { combineReducers } from 'redux';
<<<<<<< 628f4955d286d5596a9d764d355288898961d2ea
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
=======
import { reduxTokenAuthReducer } from 'redux-token-auth'

const rootReducer = combineReducers({
    reduxTokenAuth:reduxTokenAuthReducer,
>>>>>>> Added Sign In Component
});

export default rootReducer;