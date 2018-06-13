import { FETCH_TITLES_SUCCESS, FETCH_TITLES_FAILURE } from './actionTypes';

export const fetchTitlesSuccess = (payload) => ({
  type: FETCH_TITLES_SUCCESS,
  payload
});

export const fetchTitlesFailure = (payload) => ({
  type: FETCH_TITLES_FAILURE,
  payload
});
