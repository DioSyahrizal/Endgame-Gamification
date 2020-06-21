import { ScoreState } from "interfaces/score";
import { Reducer, combineReducers } from "redux";
import { ScoreActionTypes } from "./types";

const initialState: ScoreState = {
  errors: null,
  loading: false,
  data: { point: 0, coin: 0 },
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
      let newState = { ...state };
      newState["point"] = newState.point - 450;
      return newState;
    }
    case ScoreActionTypes.FETCH_BUYLEVELMED_SUCCESS: {
      let newState: any = { ...state };
      let cost: number;
      if (payload === "point") {
        cost = 1000;
      } else {
        cost = 300;
      }
      newState[payload] = newState[payload] - cost;
      console.dir(newState);
      return newState;
    }
    case ScoreActionTypes.FETCH_BUYLEVELHARD_SUCCESS: {
      let newState: any = { ...state };
      let cost: number;
      if (payload === "point") {
        cost = 2000;
      } else {
        cost = 600;
      }
      newState[payload] = newState[payload] - cost;
      console.dir(newState);
      return newState;
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
