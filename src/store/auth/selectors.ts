import { AuthState } from "interfaces/auth";
import { getFromLocalStorage } from "utils/api/token";

export const getAuthLoading = (state: AuthState): boolean => {
  return state.loading;
};

export const getAuthError = (state: AuthState): string | null => {
  return state.errors ? state.errors : null;
};

export const getIsAuthenticated = (state: AuthState): boolean => {
  return getFromLocalStorage("auth_selected") !== null || state.token !== null;
};
