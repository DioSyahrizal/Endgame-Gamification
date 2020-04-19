import { ApiResponse } from "./index";

export interface Token extends ApiResponse {
  token: string;
}

export interface AuthState {
  loading: boolean;
  token: string | null;
  errors: string | null;
  selected: any;
}
