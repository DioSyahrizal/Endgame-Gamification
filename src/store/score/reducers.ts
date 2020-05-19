import { ScoreState } from "interfaces/score";
import { Reducer, combineReducers } from "redux";
import { ScoreActionTypes } from "./types";

const initialState: ScoreState = {
  errors: null,
  loading: false,
  data: 0,
};

const errors: Reducer<ScoreState["errors"]> = (
  state = initialState.errors,
  { type, payload }
) => {
  switch (type) {
    case ScoreActionTypes.FETCH_SCORE_ERROR: {
      return payload.error;
    }
    default: {
      return state;
    }
  }
};

const loading: Reducer<ScoreState["loading"]> = (
  state = initialState.loading,
  { type, payload }
) => {
  switch (type) {
    case ScoreActionTypes.FETCH_SCORE_REQUEST: {
      return true;
    }
    case ScoreActionTypes.FETCH_SCORE_ERROR:
    case ScoreActionTypes.FETCH_SCORE_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const data: Reducer<ScoreState["data"]> = (
  state = initialState.data,
  { type, payload }
) => {
  switch (type) {
    case ScoreActionTypes.FETCH_SCORE_SUCCESS: {
      return payload;
    }
    case ScoreActionTypes.FETCH_BUYITEM_SUCCESS: {
      return state - 450;
    }
    default: {
      return state;
    }
  }
};

export const scoreReducer = combineReducers<ScoreState>({
  errors,
  loading,
  data,
});
