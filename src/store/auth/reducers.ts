import { AuthState } from "interfaces/auth";
import { AuthActionTypes } from "./types";
import { combineReducers, Reducer } from "redux";

const initialState: AuthState = {
  loading: false,
  token: null,
  errors: null,
  selected: null
};

const errors: Reducer<AuthState["errors"]> = (
  state = initialState.errors,
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.FETCH_AUTH_ERROR: {
      return payload.errors;
    }
    default: {
      return state;
    }
  }
};

const loading: Reducer<AuthState["loading"]> = (
  state = initialState.loading,
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.FETCH_AUTH_REQUEST:
      return true;
    case AuthActionTypes.FETCH_AUTH_SUCCESS:
    case AuthActionTypes.FETCH_AUTH_ERROR:
      return false;
    default:
      return state;
  }
};

const token: Reducer<AuthState["token"]> = (
  state = initialState.token,
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.FETCH_AUTH_SUCCESS:
      return payload;
    case AuthActionTypes.CLEAR:
      return null;
    default:
      return state;
  }
};

const selected: Reducer<AuthState["selected"]> = (
  state = initialState.selected,
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.DETAIL_USER_SUCCESS:
      return Object.assign({}, payload);
    case AuthActionTypes.CLEAR:
      return null;
    default:
      return state;
  }
};

export const authReducer = combineReducers<AuthState>({
  errors,
  loading,
  token,
  selected
});
