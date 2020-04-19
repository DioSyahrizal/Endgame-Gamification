import axios, { Method } from "axios";
import Cookies, { CookieAttributes } from "js-cookie";

import { JsonObject } from "interfaces";
import * as env from "utils/env";
import { Token } from "interfaces/auth";

export const API_URL_ENDPOINT = env.getRuntimeEnv(
  "REACT_APP_RUNTIME_GAMA_SERVICE_URL",
  env.defaultEnvs["REACT_APP_RUNTIME_GAMA_SERVICE_URL"]
);

export function authorize(email: string, password: string) {
  return axios({
    method: "post",
    baseURL: API_URL_ENDPOINT,
    url: `/login`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json"
    },
    data: {
      email,
      password
    }
  }).then(response => response.data);
}

export function callLogin(
  token: string,
  type: Method,
  url: string,
  data?: JsonObject
) {
  return axios({
    url,
    data,
    method: type,
    baseURL: API_URL_ENDPOINT,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.data);
}

export function setToken(token: Token, options?: CookieAttributes) {
  try {
    const newToken = JSON.stringify(token);
    Cookies.set("siteid", newToken, options);
    localStorage.setItem("auth_selected", JSON.stringify(token));
  } catch (err) {
    // tslint:disable-next-line
    console.error(err);
  }
}

export function getToken(): Token | undefined {
  try {
    const tokens = Cookies.get("siteid");
    return JSON.parse(tokens!);
  } catch (err) {
    return undefined;
  }
}

export function clearToken() {
  // store.remove('siteid');
  Cookies.set("siteid", "");
  Cookies.remove("siteid");
}

export function getFromLocalStorage(itemName: string) {
  try {
    const data = localStorage.getItem(itemName);
    return JSON.parse(data!);
  } catch (error) {
    return undefined;
  }
}
