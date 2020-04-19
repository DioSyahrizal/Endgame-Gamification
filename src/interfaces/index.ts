import { Action } from "redux";

export type Json = string | number | boolean | JsonObject | JsonArray;

export interface JsonArray extends Array<Json> {}

export interface ReduxAction<T = any, P = any> extends Action<T> {
  action?: string;
  payload: P;
}

export interface JsonObject {
  [x: string]: Json;
}

export type ApiResponse = Record<string, any>;
