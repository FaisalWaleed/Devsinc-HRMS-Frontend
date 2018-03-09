import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export const modalReducer = (state = initialState.modals,action) => {
    switch(action.type) {
        case types.SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: {open: true, ...action.modalProps}
            };
        case types.HIDE_MODAL:
            return {
                modalProps: {open: false}
            };
        default:
            return state;
    }
};

