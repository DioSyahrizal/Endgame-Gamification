import { AuthState, Token } from "interfaces/auth";
import { getFromLocalStorage } from "utils/api/token";
import { User } from "interfaces/user";

export const getAuthLoading = (state: AuthState): boolean => {
  return state.loading;
};

export const getAuthError = (state: AuthState): string | null => {
  return state.errors ? state.errors : null;
};

export const getAuthToken = (state: AuthState): null | Token => {
  return getFromLocalStorage("auth_selected").token || state.token;
};

export const getIsAuthenticated = (state: AuthState): boolean => {
  return getFromLocalStorage("auth_selected") !== null || state.token !== null;
};

export const getAuthSelected = (state: AuthState): User | null => {
  return getFromLocalStorage("auth_selected").detail || state.selected;
};
