import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export const title = (state = initialState.titles,action) => {
  switch (action.type) {
    case types.FETCH_TITLES_SUCCESS:
      return {...state, allTitles: action.payload};

    case types.FETCH_TITLES_FAILURE:
      return state;
    default:
      return state;
  }
}