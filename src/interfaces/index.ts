import { Action } from "redux";

export interface ReduxAction<T = any, P = any> extends Action<T> {
  action?: string;
  payload: P;
}
