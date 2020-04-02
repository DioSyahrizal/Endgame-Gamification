import { action } from "typesafe-actions";

import { AuthActionTypes } from "./types";

export const fetchLoginRequest = (email: string, password: string) =>
  action(AuthActionTypes.FETCH_AUTH_REQUEST, { email, password });

export const fetchLoginSuccess = (token: string) =>
  action(AuthActionTypes.FETCH_AUTH_SUCCESS, token);

export const fetchLoginError = (err: any) =>
  action(AuthActionTypes.FETCH_AUTH_ERROR, err);

export const detailUserSuccess = (payload: any) => {
  return action(AuthActionTypes.DETAIL_USER_SUCCESS, payload);
};

export const clearAuthRequest = () => {
  return action(AuthActionTypes.CLEAR_REQUEST);
};

export const clearAuth = () => {
  return action(AuthActionTypes.CLEAR);
};

export const validateAuth = (initial: boolean = false) => {
  return action(AuthActionTypes.VALIDATION, initial);
};
